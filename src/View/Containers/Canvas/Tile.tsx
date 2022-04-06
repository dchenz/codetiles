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

const iconSize = 48;

export default function Tile({ manifest, ...props }: TilePropTypes) {
  const tileIcon = React.cloneElement(manifest.icon, {
    size: iconSize,
    transform: `translate(${props.width * 0.5 - iconSize / 2}, ${props.height * 0.25})`
  });
  return (
    <g transform={`translate(${props.x}, ${props.y})`}>
      <rect
        width={props.width}
        height={props.height}
        rx={0}
        ry={0}
        {...manifest?.attributes}
      />
      <text
        transform={`translate(${props.width * 0.5}, ${props.height * 0.75})`}
        textAnchor="middle"
        fontSize={16}
        color="#000000"
      >
        {manifest.name}
      </text>
      {tileIcon}
    </g>
  );
}