import React, { useContext } from "react";
import { ListGroup, Tab, Tabs } from "react-bootstrap";
import { InteractionContext } from "../../Context/InteractionContext";
import { BasicTiles, ControlTiles, TileManifestType } from "../TileManifest";
import "./styles.css";

type TileListPropTypes = {
  title: string,
  items: TileManifestType[]
}

export default function TileListWrapper(): JSX.Element {
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
        <TileList title="Basic" items={BasicTiles} />
      </Tab>
      <Tab title="Control" eventKey="Control">
        <TileList title="Control" items={ControlTiles} />
      </Tab>
    </Tabs>
  );
}

function TileList({ items }: TileListPropTypes): JSX.Element {
  return (
    <div className="scrollable-list">
      <ListGroup>
        {
          items.map((option, k) =>
            <TileListItem key={k} {...option} />
          )
        }
      </ListGroup>
    </div>
  );
}

function TileListItem({ icon, displayName, itemType }: TileManifestType): JSX.Element {
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