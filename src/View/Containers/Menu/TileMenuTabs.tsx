import React, { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { InteractionContext } from "../../Context/InteractionContext";
import { BasicTiles, ControlTiles } from "../TileBlueprints";
import { TileMenuList } from "./TileMenuList";

export function TileMenuTabs(): JSX.Element {
  // Clear selection on tab change
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  return (
    <Tabs
      defaultActiveKey="Basic"
      onSelect={() => {
        interactionCtx.menu.selectedTile = null;
        setInteractionCtx(interactionCtx);
      }}
    >
      <Tab title="Basic" eventKey="Basic">
        <TileMenuList title="Basic" items={BasicTiles} />
      </Tab>
      <Tab title="Control" eventKey="Control">
        <TileMenuList title="Control" items={ControlTiles} />
      </Tab>
    </Tabs>
  );
}
