import React, { useContext, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { ProgramObject } from "../../../Model/ProgramObject";
import { Point2D, TileInstanceType } from "../../../types";
import { TilesContext, TilesType } from "../../Context/ActiveTilesContext";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import ConnectorLine from "./ConnectorLine";



const iconSize = 42;

export default function Tile({ blueprint, ...props }: TileInstanceType): JSX.Element {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const { posCtx } = useContext(GridPositionContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);
  const [coord, setCoord] = useState<Point2D>({
    x: props.x,
    y: props.y
  });

  const handleTileDragStart = () => {
    interactionCtx.canvas.isDraggingTile = true;
    setInteractionCtx(interactionCtx);
    setTilesCtx(putTileOnTop(tilesCtx, props.model));
  };

  const handleTileDrag = (_: unknown, data: DraggableData) => {
    setCoord({
      x: data.x,
      y: data.y
    });
  };

  const handleTileDragStop = () => {
    interactionCtx.canvas.isDraggingTile = false;
    setInteractionCtx(interactionCtx);
  };

  const centerPointAbs = {
    x: coord.x + props.width / 2,
    y: coord.y + props.height / 2
  };

  const centerPointRel = {
    x: props.width / 2,
    y: props.height / 2
  };

  return (
    <React.Fragment>
      {
        props.model.outboundConnectors.map((conn, k) =>
          <ConnectorLine
            key={k}
            model={conn}
            startPoint={centerPointAbs}
            initDegrees={k * 360 / props.model.outboundConnectors.length + 90}
          />
        )
      }
      <Draggable
        defaultPosition={coord}
        onStart={handleTileDragStart}
        onDrag={handleTileDrag}
        onStop={handleTileDragStop}
        scale={posCtx.zoom}
      >
        <g style={{ cursor: "pointer"}}>
          <rect
            width={props.width}
            height={props.height}
            {...blueprint?.attributes}
          />
          <text
            transform={`translate(${centerPointRel.x}, ${props.height * 0.75})`}
            textAnchor="middle"
            fontSize={16}
            fill="#000000"
          >
            {blueprint.displayName}
          </text>
          {
            React.cloneElement(blueprint.icon, {
              size: iconSize,
              transform: `translate(${centerPointRel.x - iconSize / 2}, ${props.height * 0.25})`
            })
          }
        </g>
      </Draggable>
    </React.Fragment>
  );
}



function putTileOnTop(tilesCtx: TilesType[], model: ProgramObject): TilesType[] {
  let idx = 0;
  for (let i = 0; i < tilesCtx.length; i++) {
    if (tilesCtx[i].model.id == model.id) {
      idx = i;
      break;
    }
  }
  const tiles = [...tilesCtx];
  const t = tiles.splice(idx, 1)[0];
  tiles.push(t);
  return tiles;
}