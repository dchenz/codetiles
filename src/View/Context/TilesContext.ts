import { createContext } from "react";
import { ProgramObject } from "../../Model/ProgramObject";

const contextState = {
  tilesCtx: [],
  setTilesCtx: (_: TilesType[]) => { _ == _; }
};

export const TilesContext = createContext<TilesCtxType>(contextState);

export type TilesType = {
  model: ProgramObject,
  view: JSX.Element
}

export type TilesCtxType = {
  tilesCtx: TilesType[],
  setTilesCtx: (_: TilesType[]) => void
}