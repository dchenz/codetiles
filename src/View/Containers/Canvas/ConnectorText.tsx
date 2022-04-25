import React from "react";
import { ConnectorTextProps } from "../../../types";

export default function ConnectorText(props: ConnectorTextProps) {
  return (
    <text
      transform={`translate(${props.position.x}, ${props.position.y})`}
      fontSize={24}
    >
      {props.text}
    </text>
  );
}