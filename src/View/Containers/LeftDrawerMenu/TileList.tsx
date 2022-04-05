import React, { useContext } from "react";
import { ListGroup, Tab, Tabs } from "react-bootstrap";
import { ArrowRepeat, ArrowRightCircle, Diagram2 } from "react-bootstrap-icons";
import { SelectionContext } from "../../Context/SelectionContext";
import "./styles.css";

const iconSize = 24;

type TileListPropTypes = {
  title: string,
  items: ProgramObjectTile[]
}

type ProgramObjectTile = {
  icon: JSX.Element,
  name: string,
  itemType: string
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
        <TileList title="Basic"
          items={[
            {
              icon: <ArrowRightCircle size={iconSize} />,
              name: "Test Tile 1",
              itemType: "loop"
            }
          ]}
        />
      </Tab>
      <Tab title="Control" eventKey="Control">
        <TileList title="Control"
          items={[
            {
              icon: <Diagram2 size={iconSize} />,
              name: "Conditional Block",
              itemType: "conditional"
            },
            {
              icon: <ArrowRepeat size={iconSize} />,
              name: "Loop Block",
              itemType: "loop"
            },
          ]}
        />
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

function TileListItem({ icon, name, itemType }: ProgramObjectTile): JSX.Element {
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