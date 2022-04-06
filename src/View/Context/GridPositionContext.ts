import { createContext } from "react";

/*
  This context tracks the position of user's mouse over the SVG grid.
  x, y -> Coordinates on SVG
  tileX, tileY -> Column and row number (x, y divided by width of grid cell)
*/

const contextState = {
  posCtx: {
    tileX: 0,
    tileY: 0,
    x: 0,
    y: 0
  },
  setPosCtx: (_: GridPositionType) => { _ == _; }
};

export const GridPositionContext = createContext<GridPositionCtxType>(contextState);

export type GridPositionCtxType = {
  posCtx: GridPositionType,
  setPosCtx: (_: GridPositionType) => void
}

export type GridPositionType = {
  tileX: number,
  tileY: number,
  x: number,
  y: number
}