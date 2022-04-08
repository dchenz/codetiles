import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { TileBlueprintType } from "../../../types";
import { InteractionContext } from "../../Context/InteractionContext";
import "./styles.css";


export function TileMenuListItem({ icon, displayName, itemType }: TileBlueprintType): JSX.Element {
  // Select tile on click
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const isItemSelected = itemType === interactionCtx.menu.selectedTile;
  const selectThis = () => {
    if (isItemSelected) {
      interactionCtx.menu.selectedTile = null;
      setInteractionCtx(interactionCtx);
    } else {
      interactionCtx.menu.selectedTile = itemType;
      setInteractionCtx(interactionCtx);
    }
  };
  return (
    <ListGroup.Item
      className={"tile-list-item" + (isItemSelected ? " tile-selected" : "")}
      onClick={selectThis}
    >
      {icon} &nbsp;
      <span>{displayName}</span>
    </ListGroup.Item>
  );
}