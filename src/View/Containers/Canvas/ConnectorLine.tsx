import React, { useContext, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { Connector } from "../../../Model/Connector";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import { Point2D } from "./types";

type ConnectorPropTypes = {
  model: Connector,
  startPoint: Point2D,
  initDegrees: number
}

const nodeSize = 25;

export default function ConnectorLine({ startPoint, model, initDegrees }: ConnectorPropTypes): JSX.Element {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const { posCtx } = useContext(GridPositionContext);
  const [end, setEnd] = useState(calculateConnectorEndPoint(startPoint, initDegrees, 300));

  const handleConnDragStart = () => {
    interactionCtx.canvas.isDraggingConnector = true;
    setInteractionCtx(interactionCtx);
  };

  const handleConnDrag = (_: unknown, data: DraggableData) => {
    setEnd({
      x: data.x,
      y: data.y
    });
  };

  const handleConnDragStop = () => {
    interactionCtx.canvas.isDraggingConnector = false;
    setInteractionCtx(interactionCtx);
  };

  const midPoint = {
    x: (end.x + startPoint.x) / 2,
    y: (end.y + startPoint.y) / 2
  };

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
        transform={`translate(${midPoint.x}, ${midPoint.y})`}
        textAnchor="middle"
        fontSize={24}
        fill="#000000"
      >
        {model.caption}
      </text>
      <Draggable
        defaultPosition={end}
        onStart={handleConnDragStart}
        onDrag={handleConnDrag}
        onStop={handleConnDragStop}
        scale={posCtx.zoom}
      >
        <rect
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
  const adjustedDegrees =  2 * (degrees <= 180 ? 90 : 270) - degrees;
  const radians = adjustedDegrees * Math.PI / 180;
  // Calculate coordinates of line's other point
  return {
    x: startPoint.x + Math.sin(radians) * distance,
    y: startPoint.y + Math.cos(radians) * distance
  };
}