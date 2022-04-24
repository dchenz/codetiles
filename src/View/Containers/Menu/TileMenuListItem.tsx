import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { TileBlueprintType } from "../../../types";
import { EditorContext } from "../../Context/EditorContext";
import { InteractionContext } from "../../Context/InteractionContext";
import "./styles.css";


export function TileMenuListItem({ icon, displayName, itemType }: TileBlueprintType): JSX.Element {
  const { editorCtx } = useContext(EditorContext);
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const isItemSelected = itemType === interactionCtx.menu.selectedTile;
  const selectThis = () => {
    // Do not allow tile placements while editor is prompting "discard changes"
    if (!editorCtx.closing) {
      if (isItemSelected) {
        interactionCtx.menu.selectedTile = null;
        setInteractionCtx(interactionCtx);
      } else {
        interactionCtx.menu.selectedTile = itemType;
        setInteractionCtx(interactionCtx);
      }
    }
  };
  return (
    <ListGroup.Item
      className={"tile-list-item" + (isItemSelected ? " tile-selected" : "")}
      disabled={editorCtx.closing}
      onClick={selectThis}
    >
      {icon} &nbsp;
      <span>{displayName}</span>
    </ListGroup.Item>
  );
}