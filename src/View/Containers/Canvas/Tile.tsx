import React from "react";
import { ProgramObject } from "../../../Model/ProgramObject";
import { TileManifestType } from "../TileManifest";

type TilePropTypes = {
  width: number,
  height: number,
  x: number,
  y: number,
  model: ProgramObject,
  manifest: TileManifestType
}

export default function Tile({ manifest, ...props }: TilePropTypes) {
  return (
    <g>

      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        rx={0}
        ry={0}
        {...manifest?.attributes}
      />
      <text
        x={props.x + props.width / 2}
        y={props.y + props.height / 2}
        textAnchor="middle"
        fontSize={16}
        color="#000000"
      >
        {manifest.name}
      </text>
    </g>
  );
}