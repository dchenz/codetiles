import { createContext } from "react";
import { ProgramObject } from "../../Model/ProgramObject";

const contextState = {
  editorCtx: {
    menuClosed: true,
    editorState: null
  },
  setEditorCtx: (_: EditorType) => { _ == _; }
};

export const EditorContext = createContext<EditorCtxType>(contextState);

export type EditorCtxType = {
  editorCtx: EditorType,
  setEditorCtx: (_: EditorType) => void
}

export type EditorType = {
  menuClosed: boolean,
  editorState: ProgramObject | null
}