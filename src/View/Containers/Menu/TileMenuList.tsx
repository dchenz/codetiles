import React from "react";
import { ListGroup } from "react-bootstrap";
import { TileMenuListProps } from "../../../types";
import { TileMenuListItem } from "./TileMenuListItem";

export function TileMenuList({ items }: TileMenuListProps): JSX.Element {
  return (
    <div className="scrollable-list">
      <ListGroup>
        {
          items.map((option, k) =>
            <TileMenuListItem key={k} {...option} />
          )
        }
      </ListGroup>
    </div>
  );
}