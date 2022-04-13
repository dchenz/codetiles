import React from "react";
import { DisconnectorNodeProps } from "../../../types";

export default function DisconnectNode(props: DisconnectorNodeProps) {
  return (
    <rect
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      x={props.position.x - props.size / 2}
      y={props.position.y - props.size / 2}
      width={props.size}
      height={props.size}
      fill="#ff0000"
    />
  );
}