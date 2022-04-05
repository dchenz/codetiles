import { createContext } from "react";

const contextState = {
  selectionCtx: {
    selected: null
  },
  setSelectionCtx: (_: SelectionType) => { _ == _; }
};

export const SelectionContext = createContext<SelectionCtxType>(contextState);

export type SelectionCtxType = {
  selectionCtx: SelectionType,
  setSelectionCtx: (_: SelectionType) => void
}

export type SelectionType = {
  selected: string | null
}