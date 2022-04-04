import React from "react";
import { ListGroup, Tab, Tabs } from "react-bootstrap";
import { ArrowRepeat, ArrowRightCircle, Diagram2 } from "react-bootstrap-icons";
import { Conditional } from "../../../../Model/Conditional";
import { Loop } from "../../../../Model/Loop";
import { ProgramObject } from "../../../../Model/ProgramObject";
import "./styles.css";

const iconSize = 24;

type TileListPropTypes = {
  title: string,
  items: TileListItemPropTypes[]
}

type TileListItemPropTypes = {
  icon: JSX.Element,
  displayName: string,
  item: typeof ProgramObject
}

export default function TileListWrapper(): JSX.Element {
  return (
    <Tabs defaultActiveKey="Basic">
      <Tab title="Basic" eventKey="Basic">
        <TileList title="Basic"
          items={[
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            },
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            },
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            },
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            },
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            },
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            },
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            },
            {
              icon: <ArrowRightCircle size={iconSize} />,
              displayName: "Test Tile",
              item: Loop
            }
          ]}
        />
      </Tab>
      <Tab title="Control" eventKey="Control">
        <TileList title="Control"
          items={[
            {
              icon: <Diagram2 size={iconSize} />,
              displayName: "Conditional Block",
              item: Conditional
            },
            {
              icon: <ArrowRepeat size={iconSize} />,
              displayName: "Loop Block",
              item: Loop
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

function TileListItem({ icon, displayName }: TileListItemPropTypes): JSX.Element {
  return (
    <ListGroup.Item className="tile-list-item">
      {icon} &nbsp;
      <span>{displayName}</span>
    </ListGroup.Item>
  );
}