import { DraggableData } from "react-draggable";
import { Attribute } from "./Model/Attributes/Attribute";
import { Connector } from "./Model/Connector";
import { ProgramObject } from "./Model/ProgramObject";

export type CanvasProps = {
  cellSize: number,
  rowCount: number,
  columnCount: number
}

export type TilePlacementType = {
  tileType: string,
  x: number,
  y: number
}

export type Point2D = {
  x: number,
  y: number
}

export type TileMenuListProps = {
  title: string,                      // Title of tab
  items: TileBlueprintType[]           // All tiles under the tab
}

export type ToggleCloseProps = {
  isClosed: boolean,
  setClosed: (_: boolean) => void
}

type TileSVGStyles = {
  fill?: string,
  stroke?: string,
  strokeWidth?: number
}

// Blueprint for a tile
export type TileBlueprintType = {
  icon: JSX.Element,                  // Tile icon
  displayName: string,                // Text in menu list and on canvas
  itemType: string,                   // Must be the same as type in model's class
  modelClass: (new (title?: string) => ProgramObject),   // Constructor to instantiate new model
  attributes: TileSVGStyles,
  hoverConnectableAttributes?: TileSVGStyles,
  hoverNotConnectableAttributes?: TileSVGStyles,
  selectedAttributes?: TileSVGStyles
}

// Instance of a tile
export type TileInstanceType = {
  width: number,
  height: number,
  x: number,
  y: number,
  model: ProgramObject,
  blueprint: TileBlueprintType,
  connectorHover: ConnectorHoverType | null,
  priority: number
}

type ConnectorHoverType = {
  connectable: boolean
}

export type TileProps = {
  instance: TileInstanceType,
  onTileDragStart: () => void,
  onTileDragEnd: () => void
}

export type ConnectorProps = {
  model: Connector,
  tileInstance: TileInstanceType,
  startPoint: Point2D,
  initDegrees: number,
  minLength: number
}

export type ConnectorNodeProps = {
  position: Point2D,
  onDragStart: () => void,
  onDrag: (_: unknown, data: DraggableData) => void,
  onDragStop: () => void,
  zoom: number,
  size: number
}

export type DisconnectorNodeProps = {
  position: Point2D,
  onClick: () => void,
  size: number
}

export type ConnectorTextProps = {
  position: Point2D,
  text: string
}

export type AttributeFormProps = {
  tile: ProgramObject,
  onSave: () => void,
  onCancel: () => void
}

export type AttributeFormGroupProps = {
  attr: Attribute,
  commitValue: (_: string) => void
}

export type ExportButtonProps = {
  basename: string
}