import { createContext } from "react";
import { TileInstanceType } from "../../types";

/*
  This context tracks the active tiles placed onto the canvas.
*/

const contextState = {
  tilesCtx: [],
  setTilesCtx: (_: TileInstanceType[]) => { _ == _; }
};

export const TilesContext = createContext<ActiveTilesCtxType>(contextState);

export type ActiveTilesCtxType = {
  tilesCtx: TileInstanceType[],
  setTilesCtx: (_: TileInstanceType[]) => void
}