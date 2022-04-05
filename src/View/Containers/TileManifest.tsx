import React from "react";
import { ArrowRepeat, Diagram2 } from "react-bootstrap-icons";

const iconSize = 24;

export type TileManifestType = {
  icon: JSX.Element,
  name: string,
  itemType: string,
  attributes?: {
    fill?: string
  }
}

export const BasicTiles: TileManifestType[] = [
  {
    icon: <ArrowRepeat size={iconSize} />,
    name: "Loop",
    itemType: "loop",
    attributes: {
      fill: "lightgreen"
    }
  }
];

export const ControlTiles: TileManifestType[] = [
  {
    icon: <Diagram2 size={iconSize} />,
    name: "Conditional",
    itemType: "conditional",
    attributes: {
      fill: "lightblue"
    }
  }
];

export function nameToTile(name: string): TileManifestType {
  for (const t of ControlTiles) {
    if (t.itemType == name) {
      return t;
    }
  }
  for (const t of BasicTiles) {
    if (t.itemType == name) {
      return t;
    }
  }
  console.error("Unknown tile name: " + name);
  throw 1;
}