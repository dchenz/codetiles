import { createContext } from "react";

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