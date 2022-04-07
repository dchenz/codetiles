import React, { useContext, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { Connector } from "../../../Model/Connector";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import { Point2D } from "./types";

type ConnectorPropTypes = {
  model: Connector,
  startPoint: Point2D,
  degrees: number
}

const nodeSize = 30;
const textMargin = 20;

export default function ConnectorLine({ startPoint, model, degrees }: ConnectorPropTypes): JSX.Element {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const { posCtx } = useContext(GridPositionContext);
  const [end, setEnd] = useState(calculateConnectorEndPoint(startPoint, degrees, 300));

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

  // Needs to be fixed
  const textDegrees = degrees % 180 - 90;
  const d = (90 - Math.abs(90 - degrees % 180));
  const textPos = {
    x: (end.x + startPoint.x) / 2 + textMargin * Math.cos(d * Math.PI / 180),
    y: (end.y + startPoint.y) / 2 - textMargin * Math.sin(d * Math.PI / 180)
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
        transform={`translate(${textPos.x}, ${textPos.y}) rotate(${textDegrees})`}
        textAnchor="middle"
        fontSize={12}
        color="#000000"
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