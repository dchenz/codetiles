import { createContext } from "react";
import { ProgramObject } from "../../Model/ProgramObject";

const contextState = {
  tilesCtx: [],
  setTilesCtx: (_: ProgramObject[]) => { _ == _; }
};

export const TilesContext = createContext<TilesCtxType>(contextState);

export type TilesCtxType = {
  tilesCtx: ProgramObject[],
  setTilesCtx: (_: ProgramObject[]) => void
}