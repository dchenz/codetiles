import React, { useContext } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { TileProps } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { EditorContext } from "../../Context/EditorContext";
import { GridPositionContext } from "../../Context/GridPositionContext";

const iconSize = 42;

export default function Tile({ instance, ...props }: TileProps): JSX.Element {
  const { posCtx } = useContext(GridPositionContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);
  const { editorCtx, setEditorCtx } = useContext(EditorContext);

  const handleTileDrag = (_: unknown, data: DraggableData) => {
    instance.x = data.x;
    instance.y = data.y;
    setTilesCtx(tilesCtx);
  };

  return (
    <Draggable
      defaultPosition={{ x: instance.x, y: instance.y }}
      onStart={props.onTileDragStart}
      onDrag={handleTileDrag}
      onStop={props.onTileDragEnd}
      scale={posCtx.zoom}
    >
      <g style={{ cursor: "pointer" }} onClick={() => {
        editorCtx.editorState = instance.model;
        editorCtx.menuClosed = true;
        setEditorCtx(editorCtx);
      }}>
        <rect
          width={instance.width}
          height={instance.height}
          {...instance.blueprint?.attributes}
          stroke={instance.isConnectorHovering ?
            instance.blueprint.hoverAttributes?.stroke :
            instance.blueprint.attributes?.stroke}
          strokeWidth={instance.isConnectorHovering ?
            instance.blueprint.hoverAttributes?.strokeWidth :
            instance.blueprint.attributes?.strokeWidth}
        />
        <text
          transform={`translate(${instance.width / 2}, ${instance.height * 0.75})`}
          textAnchor="middle"
          fontSize={16}
          fill="#000000"
        >
          {instance.model.title}
        </text>
        {
          React.cloneElement(instance.blueprint.icon, {
            size: iconSize,
            transform: `translate(${instance.width / 2 - iconSize / 2}, ${instance.height * 0.25})`
          })
        }
      </g>
    </Draggable>
  );
}

