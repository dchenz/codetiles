import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import { ProgramObject } from "../../../Model/ProgramObject";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import { TileManifestType } from "../TileManifest";

type TilePropTypes = {
  width: number,
  height: number,
  x: number,
  y: number,
  model: ProgramObject,
  manifest: TileManifestType
}

const iconSize = 42;

export default function Tile({ manifest, ...props }: TilePropTypes) {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const { posCtx } = useContext(GridPositionContext);
  const [coord, setCoord] = useState({
    x: props.x,
    y: props.y
  });
  const tileIcon = React.cloneElement(manifest.icon, {
    size: iconSize,
    transform: `translate(${props.width * 0.5 - iconSize / 2}, ${props.height * 0.25})`
  });
  return (
    <Draggable
      position={{ x: coord.x, y: coord.y }}
      onStart={() => {
        interactionCtx.canvas.isDraggingTile = true;
        setInteractionCtx(interactionCtx);
      }}
      onDrag={() => {
        console.log("on drag:", coord);
        setCoord({
          x: posCtx.x - props.width * 0.5,
          y: posCtx.y - props.height * 0.5
        });
      }}
      onStop={() => {
        interactionCtx.canvas.isDraggingTile = false;
        console.log("drag stop:", coord);
        setInteractionCtx(interactionCtx);
      }}
      scale={posCtx.zoom}
    >
      <g>
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
          {manifest.displayName}
        </text>
        {tileIcon}
      </g>
    </Draggable>
  );
}