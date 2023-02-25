import React from "react";
import { ArrowRepeat, Box, Braces, Diagram2, Display, PauseBtn, PlayBtn, StopBtn } from "react-bootstrap-icons";
import { Conditional } from "../../Model/Tiles/Conditional";
import { EndScope } from "../../Model/Tiles/EndScope";
import { StartPoint } from "../../Model/Tiles/StartPoint";
import { ExitPoint } from "../../Model/Tiles/ExitPoint";
import { FunctionDeclare } from "../../Model/Tiles/FunctionDeclare";
import { InitVariable } from "../../Model/Tiles/InitVariable";
import { Loop } from "../../Model/Tiles/Loop";
import { PrintConsole } from "../../Model/Tiles/PrintConsole";
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
  },
  {
    icon: <Display size={iconSize} />,
    displayName: "Print to console",
    itemType: "print_console",
    modelClass: PrintConsole,
    attributes: {
      fill: "#f2bdff",
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
      fill: "#d1f4ff",
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
  },
  {
    icon: <Braces size={iconSize} />,
    displayName: "Declare function",
    itemType: "function_declare",
    modelClass: FunctionDeclare,
    attributes: {
      fill: "#ffe3bf",
      stroke: "#000000",
      strokeWidth: 1
    },
    hoverConnectableAttributes: defaultHoverConnectableAttrs,
    hoverNotConnectableAttributes: defaultHoverNotConnectableAttrs,
    selectedAttributes: defaultSelectedAttrs
  },
  {
    icon: <PauseBtn size={iconSize} />,
    displayName: "End scope",
    itemType: "end_scope",
    modelClass: EndScope,
    attributes: {
      fill: "#ff9e8c",
      stroke: "#000000",
      strokeWidth: 1
    },
    hoverConnectableAttributes: defaultHoverConnectableAttrs,
    hoverNotConnectableAttributes: defaultHoverNotConnectableAttrs,
    selectedAttributes: defaultSelectedAttrs
  },
];

const StartPointTile: TileBlueprintType = {
  icon: <PlayBtn size={iconSize} />,
  displayName: "Start",
  itemType: "start",
  modelClass: StartPoint,
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
  if (type == "start") {
    return StartPointTile;
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
  throw new Error("Unknown tile displayName: " + name);
}