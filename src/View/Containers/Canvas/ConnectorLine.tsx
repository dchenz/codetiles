import React, { useContext, useState } from "react";
import { DraggableData } from "react-draggable";
import { ProgramObject } from "../../../Model/ProgramObject";
import { ConnectorProps, Point2D, TileInstanceType } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import ConnectNode from "./ConnectNode";
import ConnectorText from "./ConnectorText";
import DisconnectNode from "./DisconnectNode";
import { getBearing, getDistance, isRectOverlap } from "./mathutils";


const nodeSize = 24;

export default function ConnectorLine(props: ConnectorProps): JSX.Element {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const { tilesCtx } = useContext(TilesContext);
  const { posCtx } = useContext(GridPositionContext);
  // eslint-disable-next-line prefer-const
  let [degrees, setDegrees] = useState(props.initDegrees);
  // eslint-disable-next-line prefer-const
  let [size, setSize] = useState(props.minLength);

  let end: Point2D;
  if (props.model.targetId == null) {
    end = calculateConnectorEndPoint(props.startPoint, degrees, size);
  } else {
    const connectedTile = tilesCtx.filter(x => x.model.id == props.model.targetId)[0];
    end = {
      x: connectedTile.x + connectedTile.width / 2,
      y: connectedTile.y + connectedTile.height / 2
    };
    // Degrees and size cannot be set here
    // These need to be set if connector is removed
    degrees = getBearing(props.startPoint, end);
    size = getDistance(props.startPoint, end);
  }

  const handleConnDragStart = () => {
    interactionCtx.canvas.isDraggingConnector = true;
    setInteractionCtx(interactionCtx);
  };

  const handleConnDrag = (_: unknown, data: DraggableData) => {
    const p = {
      x: data.x,
      y: data.y
    };
    console.log(p);
    setDegrees(getBearing(props.startPoint, p));
    // Stop the node from going under the tile
    if (size < props.minLength) {
      setSize(props.minLength);
    } else {
      setSize(getDistance(props.startPoint, p));
    }

    handleOverlappingTiles(end, tilesCtx, props.tileInstance.model);
  };

  const handleConnDragStop = () => {
    interactionCtx.canvas.isDraggingConnector = false;
    setInteractionCtx(interactionCtx);
    // Check if connector overlaps any tiles on drag stop
    const potentialConnectedTile = getOverlappingTile(tilesCtx);
    let connectSuccess = false;
    if (potentialConnectedTile) {
      // Attempt connection with tile
      connectSuccess = props.model.sendConnection(potentialConnectedTile.model);
      // Stop hovering
      potentialConnectedTile.connectorHover = null;
    }
    if (!connectSuccess) {
      setDegrees(props.initDegrees);
      setSize(props.minLength);
    }
  };

  return (
    <g>
      <line
        x1={props.startPoint.x}
        y1={props.startPoint.y}
        x2={end.x}
        y2={end.y}
        stroke="#000000"
      />
      <ConnectorText
        position={getTextCoord(props.startPoint, end, size)}
        text={props.model.caption}
      />
      {
        props.model.targetId == null ?
          <ConnectNode
            position={end}
            onDragStart={handleConnDragStart}
            onDrag={handleConnDrag}
            onDragStop={handleConnDragStop}
            zoom={posCtx.zoom}
            size={nodeSize}
          /> :
          <DisconnectNode
            position={calculateConnectorEndPoint(props.startPoint, degrees, size - props.tileInstance.width / 2 - 50)}
            onClick={() => {
              const t = tilesCtx.find(x => x.model.id == props.model.targetId);
              if (t) {
                props.model.disconnect(t.model);
                // Set to initial size
                setDegrees(props.initDegrees);
                setSize(props.minLength);
              }
            }}
            size={nodeSize}
          />
      }
    </g>
  );
}

function handleOverlappingTiles(connPoint: Point2D, tiles: TileInstanceType[], ignoreTile: ProgramObject) {
  let found = false;
  for (const t of tiles) {
    const tPoint = {
      x: t.x,
      y: t.y
    };
    if (!found && t.model.id != ignoreTile.id && isRectOverlap(connPoint, nodeSize, nodeSize, tPoint, t.width, t.height)) {
      // Multiple tiles can overlap, only match with the top-most on canvas
      t.connectorHover = {
        connectable: t.model._testReceiveConnection(ignoreTile)
      };
      found = true;
    } else {
      t.connectorHover = null;
    }
  }
}

function getOverlappingTile(tiles: TileInstanceType[]): TileInstanceType | null {
  return tiles.find(x => x.connectorHover != null) ?? null;
}

function calculateConnectorEndPoint(startPoint: Point2D, degrees: number, distance: number): Point2D {
  // 0 degrees is considered north (top of screen) despite Y increasing downwards
  const adjustedDegrees = 2 * (degrees <= 180 ? 90 : 270) - degrees;
  const radians = adjustedDegrees * Math.PI / 180;
  // Calculate coordinates of line's other point
  return {
    x: startPoint.x + Math.sin(radians) * distance,
    y: startPoint.y + Math.cos(radians) * distance
  };
}

function getTextCoord(startPoint: Point2D, endPoint: Point2D, size: number): Point2D {
  // Adjust values with font size and tile width
  if (size > 200) {
    return {
      x: (endPoint.x + startPoint.x) / 2,
      y: (endPoint.y + startPoint.y) / 2
    };
  }
  const offsetSize = 25;
  const xOffset = offsetSize * (endPoint.x > startPoint.x ? 1 : -1);
  let yOffset;
  if (endPoint.y > startPoint.y) {
    yOffset = offsetSize + 15;
  } else {
    yOffset = -offsetSize;
  }
  return {
    x: endPoint.x + xOffset,
    y: endPoint.y + yOffset
  };
}