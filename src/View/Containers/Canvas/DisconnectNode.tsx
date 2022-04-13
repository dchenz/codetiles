import React from "react";
import { XCircle } from "react-bootstrap-icons";
import { DisconnectorNodeProps } from "../../../types";

export default function DisconnectNode(props: DisconnectorNodeProps) {
  return (
    <g style={{ cursor: "pointer" }} onClick={props.onClick}>
      <rect
        x={props.position.x - props.size / 2}
        y={props.position.y - props.size / 2}
        width={props.size}
        height={props.size}
        rx={50} ry={50}
        fill="#ffffff"
      />
      <XCircle
        x={props.position.x - props.size / 2}
        y={props.position.y - props.size / 2}
        width={props.size}
        height={props.size}
        fill="#000000"
      />
    </g>
  );
}