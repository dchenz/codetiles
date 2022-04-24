import { createContext } from "react";
import { ProgramObject } from "../../Model/ProgramObject";

const contextState = {
  editorCtx: {
    editorState: null,
    closing: false,
    hasChanges: false
  },
  setEditorCtx: (_: EditorType) => { _ == _; }
};

export const EditorContext = createContext<EditorCtxType>(contextState);

export type EditorCtxType = {
  editorCtx: EditorType,
  setEditorCtx: (_: EditorType) => void
}

export type EditorType = {
  editorState: ProgramObject | null,
  closing: boolean,
  hasChanges: boolean
}