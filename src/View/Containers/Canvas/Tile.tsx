import React, { useContext } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { TileProps } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { EditorContext } from "../../Context/EditorContext";
import { GridPositionContext } from "../../Context/GridPositionContext";
import "./styles.css";

const iconSize = 42;
const displayFontSize = 16;

export default function Tile({ instance, ...props }: TileProps): JSX.Element {
  const { posCtx } = useContext(GridPositionContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);
  const { editorCtx, setEditorCtx } = useContext(EditorContext);

  const handleTileDrag = (_: unknown, data: DraggableData) => {
    instance.x = data.x;
    instance.y = data.y;
    setTilesCtx(tilesCtx);
  };

  const handleTileDragEnd = () => {
    // Don't let tiles be dragged outside of canvas edges
    if (instance.x < 0) {
      instance.x = 0;
    } else if (instance.x + instance.width >= props.maxX) {
      instance.x = props.maxX - instance.width;
    }
    if (instance.y < 0) {
      instance.y = 0;
    } else if (instance.y + instance.height >= props.maxY) {
      instance.y = props.maxY - instance.height;
    }
    setTilesCtx(tilesCtx);
    props.onTileDragEnd();
  };

  // Connectors being hovered over current tile
  let extraAttributes;
  if (instance.connectorHover != null) {
    if (instance.connectorHover.connectable) {
      extraAttributes = instance.blueprint.hoverConnectableAttributes;
    } else {
      extraAttributes = instance.blueprint.hoverNotConnectableAttributes;
    }
  } else if (editorCtx.editorState?.id == instance.model.id) {
    extraAttributes = instance.blueprint.selectedAttributes;
  } else {
    extraAttributes = {};
  }

  const onTileClick = () => {
    // Tile not clickable when editor is prompting "discard changes"
    // Tile not clickable without attributes
    if (!editorCtx.closing && instance.model.getAttributes().length > 0) {
      // Show "discard changes" prompt in editor when clicking another tile
      if (editorCtx.editorState != null && editorCtx.hasChanges) {
        editorCtx.closing = true;
      } else {
        editorCtx.editorState = instance.model;
      }
      setEditorCtx(editorCtx);
    }
  };

  const iconOffsetX = instance.width / 2 - iconSize / 2;
  const iconOffsetY = instance.height * 0.2;

  const textLines = breakDisplayName(instance.model.title);
  const textOffsetX = instance.width / 2;
  const textOffsetY = (instance.height + iconOffsetY + iconSize) / 2 - displayFontSize - 5 * (textLines.length - 1);

  return (
    <Draggable
      position={{ x: instance.x, y: instance.y }}
      onStart={props.onTileDragStart}
      onDrag={handleTileDrag}
      onStop={handleTileDragEnd}
      scale={posCtx.zoom}
    >
      <g className="cursor-p" onClick={onTileClick}>
        <rect
          width={instance.width}
          height={instance.height}
          {...instance.blueprint?.attributes}
          {...extraAttributes}
        />
        <text
          // instance.height * 1.2 + iconSize --- this is set below for icon's offset
          transform={`translate(${textOffsetX}, ${textOffsetY})`}
          fontSize={displayFontSize}
        >
          {
            textLines.map((line, k) =>
              <tspan key={k} x="0" dy="1em">
                {line}
              </tspan>
            )
          }
        </text>
        {
          React.cloneElement(instance.blueprint.icon, {
            size: iconSize,
            x: iconOffsetX,
            y: iconOffsetY
          })
        }
      </g>
    </Draggable>
  );
}

function breakDisplayName(text: string): string[] {
  const lines: string[][] = [[]];
  let ln = 0;
  for (const word of text.split(" ")) {
    const newLength = ln + word.length + (lines[lines.length - 1].length == 0 ? 0 : 1);
    if (ln + newLength > 15) {
      lines.push([]);
      ln = 0;
    }
    lines[lines.length - 1].push(word);
    ln += newLength;
  }
  return lines.map(x => x.join(" "));
}