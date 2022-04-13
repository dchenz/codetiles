import React from "react";
import { ConnectorTextProps } from "../../../types";

export default function ConnectorText(props: ConnectorTextProps) {
  return (
    <text
      transform={`translate(${props.position.x}, ${props.position.y})`}
      textAnchor="middle"
      fontSize={24}
      fill="#000000"
    >
      {props.text}
    </text>
  );
}