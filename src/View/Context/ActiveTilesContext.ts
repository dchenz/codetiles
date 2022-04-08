import { createContext } from "react";
import { TileInstanceType } from "../../types";

/*
  This context tracks the active tiles placed onto the canvas.
*/

const contextState = {
  tilesCtx: [],
  setTilesCtx: (_: TilesType[]) => { _ == _; }
};

export const TilesContext = createContext<TilesCtxType>(contextState);

export type TilesType = TileInstanceType;

export type TilesCtxType = {
  tilesCtx: TilesType[],
  setTilesCtx: (_: TilesType[]) => void
}