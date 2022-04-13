import React from "react";
import Draggable from "react-draggable";
import { ConnectorNodeProps } from "../../../types";

export default function ConnectNode(props: ConnectorNodeProps) {
  return (
    <Draggable
      position={props.position}
      onStart={props.onDragStart}
      onDrag={props.onDrag}
      onStop={props.onDragStop}
      scale={props.zoom}
    >
      <rect
        style={{ cursor: "pointer" }}
        x={props.size / -2}
        y={props.size / -2}
        width={props.size}
        height={props.size}
        fill="#000000"
      />
    </Draggable>
  );
}