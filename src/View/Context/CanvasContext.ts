import { createContext } from "react";

const contextState = {
  layoutCtx: {
    ofsX: 0,
    ofsY: 0,
    scale: 1
  },
  setLayoutCtx: (_: CanvasLayout) => { _ == _; }
};

export const CanvasContext = createContext<CanvasLayoutContext>(contextState);

export type CanvasLayoutContext = {
  layoutCtx: CanvasLayout,
  setLayoutCtx: (_: CanvasLayout) => void
}

export type CanvasLayout = {
  ofsX: number,
  ofsY: number,
  scale: number
}