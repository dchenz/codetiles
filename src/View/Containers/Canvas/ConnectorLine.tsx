import React, { useContext, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { ConnectorProps, Point2D } from "../../../types";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import { getBearing, getDistance } from "./mathutils";


const nodeSize = 25;


export default function ConnectorLine({ startPoint, model, initDegrees, minLength }: ConnectorProps): JSX.Element {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const { posCtx } = useContext(GridPositionContext);
  const [degrees, setDegrees] = useState(initDegrees);
  const [size, setSize] = useState(minLength);

  const end = calculateConnectorEndPoint(startPoint, degrees, size);

  const handleConnDragStart = () => {
    interactionCtx.canvas.isDraggingConnector = true;
    setInteractionCtx(interactionCtx);
  };

  const handleConnDrag = (_: unknown, data: DraggableData) => {
    const p = {
      x: data.x,
      y: data.y
    };
    // Stop the node from going under the tile
    if (size < minLength) {
      setDegrees(getBearing(startPoint, p));
      setSize(minLength);
    } else {
      setDegrees(getBearing(startPoint, p));
      setSize(getDistance(startPoint, p));
    }
  };

  const handleConnDragStop = () => {
    interactionCtx.canvas.isDraggingConnector = false;
    setInteractionCtx(interactionCtx);
  };

  const textCoord = getTextCoord(startPoint, end, size);

  return (
    <g>
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={end.x}
        y2={end.y}
        stroke="#000000"
      />
      <text
        transform={`translate(${textCoord.x}, ${textCoord.y})`}
        textAnchor="middle"
        fontSize={24}
        fill="#000000"
      >
        {model.caption}
      </text>
      <Draggable
        position={end}
        onStart={handleConnDragStart}
        onDrag={handleConnDrag}
        onStop={handleConnDragStop}
        scale={posCtx.zoom}
      >
        <rect
          style={{ cursor: "pointer" }}
          x={nodeSize / -2}
          y={nodeSize / -2}
          width={nodeSize}
          height={nodeSize}
          fill="#000000"
        />
      </Draggable>
    </g>
  );
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