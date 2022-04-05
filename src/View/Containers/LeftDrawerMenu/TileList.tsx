import React, { useContext } from "react";
import { ListGroup, Tab, Tabs } from "react-bootstrap";
import { SelectionContext } from "../../Context/SelectionContext";
import { BasicTiles, ControlTiles, TileManifestType } from "../TileManifest";
import "./styles.css";

type TileListPropTypes = {
  title: string,
  items: TileManifestType[]
}

export default function TileListWrapper(): JSX.Element {
  // Clear selection on tab change
  const { setSelectionCtx } = useContext(SelectionContext);
  return (
    <Tabs
      defaultActiveKey="Basic"
      onSelect={() => setSelectionCtx({ selected: null })}
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

function TileListItem({ icon, name, itemType }: TileManifestType): JSX.Element {
  // Select tile on click
  const { selectionCtx, setSelectionCtx } = useContext(SelectionContext);
  const isItemSelected = itemType === selectionCtx.selected;
  const selectThis = () => {
    if (isItemSelected) {
      setSelectionCtx({ selected: null });
    } else {
      setSelectionCtx({ selected: itemType });
    }
  };
  return (
    <ListGroup.Item
      className={"tile-list-item" + (isItemSelected ? " tile-selected" : "")}
      onClick={selectThis}
    >
      {icon} &nbsp;
      <span>{name}</span>
    </ListGroup.Item>
  );
}