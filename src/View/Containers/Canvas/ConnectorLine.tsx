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
  const [ degrees, setDegrees ] = useState(initDegrees);
  const [ size, setSize] = useState(300);

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
    setDegrees(getBearing(startPoint, p));
    setSize(getDistance(startPoint, p));
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
        position={end}
        onStart={handleConnDragStart}
        onDrag={handleConnDrag}
        onStop={handleConnDragStop}
        scale={posCtx.zoom}
      >
        <rect
          style={{ cursor: "pointer"}}
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

function getBearing(p1: Point2D, p2: Point2D): number {
  let r = Math.atan2(p2.x - p1.x, p2.y - p1.y);
  if (r < 0) {
    r += 2 * Math.PI;
  }
  const d = r * 180 / Math.PI;
  return 2 * (d <= 180 ? 90 : 270) - d;
}

function getDistance(p1: Point2D, p2: Point2D): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}