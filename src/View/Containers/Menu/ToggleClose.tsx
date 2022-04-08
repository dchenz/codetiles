import React, { useContext } from "react";
import { ChevronCompactRight, ChevronCompactLeft } from "react-bootstrap-icons";
import { ToggleCloseProps } from "../../../types";
import { InteractionContext } from "../../Context/InteractionContext";

export function ToggleClose({ isClosed, setClosed }: ToggleCloseProps): JSX.Element {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  return (
    <div
      className="toggle-collapse-btn"
      onClick={() => {
        setClosed(!isClosed);
        interactionCtx.menu.selectedTile = null;
        setInteractionCtx(interactionCtx);
      }}
    >
      {
        isClosed ?
          <ChevronCompactRight size={24} /> :
          <ChevronCompactLeft size={24} />
      }
    </div>
  );
}