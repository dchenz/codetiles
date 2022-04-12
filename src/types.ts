import { Connector } from "./Model/Connector";
import { ProgramObject } from "./Model/ProgramObject";

export type CanvasProps = {
  cellSize: number,
  rowCount: number,
  columnCount: number
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

// Blueprint for a tile
export type TileBlueprintType = {
  icon: JSX.Element,                  // Tile icon
  displayName: string,                // Text in menu list and on canvas
  itemType: string,                   // Must be the same as type in model's class
  modelClass: (new (title?: string) => ProgramObject),   // Constructor to instantiate new model
  attributes?: {
    fill?: string,
    stroke?: string,
    strokeWidth?: number
  },
  hoverAttributes?: {
    fill?: string,
    stroke?: string,
    strokeWidth?: number
  }
}

// Instance of a tile
export type TileInstanceType = {
  width: number,
  height: number,
  x: number,
  y: number,
  model: ProgramObject,
  blueprint: TileBlueprintType,
  isConnectorHovering?: boolean,
  priority: number
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
