import React from "react";
import { ArrowRepeat, Box, Diagram2, PlayBtn, StopBtn } from "react-bootstrap-icons";
import { Conditional } from "../../Model/Tiles/Conditional";
import { EntryPoint } from "../../Model/Tiles/EntryPoint";
import { ExitPoint } from "../../Model/Tiles/ExitPoint";
import { InitVariable } from "../../Model/Tiles/InitVariable";
import { Loop } from "../../Model/Tiles/Loop";
import { TileBlueprintType } from "../../types";

const iconSize = 24;

const defaultHoverConnectableAttrs = {
  stroke: "#00ff00",
  strokeWidth: 4
};
const defaultHoverNotConnectableAttrs = {
  stroke: "#ff0000",
  strokeWidth: 4
};
const defaultSelectedAttrs = {
  stroke: "#0000ff",
  strokeWidth: 4
};

export const BasicTiles: TileBlueprintType[] = [
  {
    icon: <Box size={iconSize} />,
    displayName: "Create variable",
    itemType: "variable_init",
    modelClass: InitVariable,
    attributes: {
      fill: "#ffffa6",
      stroke: "#000000",
      strokeWidth: 1
    },
    hoverConnectableAttributes: defaultHoverConnectableAttrs,
    hoverNotConnectableAttributes: defaultHoverNotConnectableAttrs,
    selectedAttributes: defaultSelectedAttrs
  }
];

export const ControlTiles: TileBlueprintType[] = [
  {
    icon: <Diagram2 size={iconSize} />,
    displayName: "Conditional",
    itemType: "conditional",
    modelClass: Conditional,
    attributes: {
      fill: "#d1f4ff",
      stroke: "#000000",
      strokeWidth: 1
    },
    hoverConnectableAttributes: defaultHoverConnectableAttrs,
    hoverNotConnectableAttributes: defaultHoverNotConnectableAttrs,
    selectedAttributes: defaultSelectedAttrs
  },
  {
    icon: <ArrowRepeat size={iconSize} />,
    displayName: "Loop",
    itemType: "loop",
    modelClass: Loop,
    attributes: {
      fill: "#abffa1",
      stroke: "#000000",
      strokeWidth: 1
    },
    hoverConnectableAttributes: defaultHoverConnectableAttrs,
    hoverNotConnectableAttributes: defaultHoverNotConnectableAttrs,
    selectedAttributes: defaultSelectedAttrs
  },
  {
    icon: <StopBtn size={iconSize} />,
    displayName: "Exit",
    itemType: "exit",
    modelClass: ExitPoint,
    attributes: {
      fill: "#ff9e8c",
      stroke: "#000000",
      strokeWidth: 1
    },
    hoverConnectableAttributes: defaultHoverConnectableAttrs,
    hoverNotConnectableAttributes: defaultHoverNotConnectableAttrs,
    selectedAttributes: defaultSelectedAttrs
  }
];

const EntryPointTile: TileBlueprintType = {
  icon: <PlayBtn size={iconSize} />,
  displayName: "Start",
  itemType: "entry",
  modelClass: EntryPoint,
  attributes: {
    fill: "#ffffff",
    stroke: "#000000",
    strokeWidth: 1
  },
  hoverConnectableAttributes: defaultHoverConnectableAttrs,
  hoverNotConnectableAttributes: defaultHoverNotConnectableAttrs,
  selectedAttributes: defaultSelectedAttrs
};

export function getTileTemplate(type: string): TileBlueprintType {
  if (type == "entry") {
    return EntryPointTile;
  }
  for (const t of ControlTiles) {
    if (t.itemType == type) {
      return t;
    }
  }
  for (const t of BasicTiles) {
    if (t.itemType == type) {
      return t;
    }
  }
  console.error("Unknown tile displayName: " + name);
  throw 1;
}