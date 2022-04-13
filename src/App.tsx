import React, { useState } from "react";
import { TileInstanceType } from "./types";
import MouseTracker from "./View/Components/MouseTracker";
import { Canvas } from "./View/Containers/Canvas";
import { Editor } from "./View/Containers/Editor";
import { Menu } from "./View/Containers/Menu";
import { TilesContext } from "./View/Context/ActiveTilesContext";
import { EditorContext, EditorType } from "./View/Context/EditorContext";
import { GridPositionContext, GridPositionType } from "./View/Context/GridPositionContext";
import { InteractionContext, InteractionType } from "./View/Context/InteractionContext";

export default function App(): JSX.Element {
  const [posCtx, setPosCtx] = useState<GridPositionType>({
    tileX: 0,
    tileY: 0,
    x: 0,
    y: 0,
    zoom: 1
  });
  const [tilesCtx, setTilesCtx] = useState<TileInstanceType[]>([]);
  const [interactionCtx, setInteractionCtx] = useState<InteractionType>({
    menu: {
      selectedTile: null
    },
    canvas: {
      ref: null,
      selectedTile: null,
      selectedConnector: null,
      isDraggingTile: false,
      isDraggingConnector: false
    }
  });
  const [editorCtx, setEditorCtx] = useState<EditorType>({
    menuClosed: true,
    editorState: null
  });
  return (
    <InteractionContext.Provider value={{ interactionCtx, setInteractionCtx }}>
      <TilesContext.Provider value={{ tilesCtx, setTilesCtx }}>
        <GridPositionContext.Provider value={{ posCtx, setPosCtx }}>
          <MouseTracker />
          <EditorContext.Provider value={{ editorCtx, setEditorCtx }}>
            <Menu />
            <Editor />
            <Canvas cellSize={25} rowCount={100} columnCount={200} />
          </EditorContext.Provider>
        </GridPositionContext.Provider>
      </TilesContext.Provider>
    </InteractionContext.Provider>
  );
}