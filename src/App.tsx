import React, { useState } from "react";
import MouseTracker from "./View/Components/MouseTracker";
import { Canvas } from "./View/Containers/Canvas";
import LeftDrawerMenu from "./View/Containers/LeftDrawerMenu";
import { TilesContext, TilesType } from "./View/Context/ActiveTilesContext";
import { GridPositionContext, GridPositionType } from "./View/Context/GridPositionContext";
import { InteractionContext, InteractionType } from "./View/Context/InteractionContext";

export default function App(): JSX.Element {
  const [posCtx, setPosCtx] = useState<GridPositionType>({
    tileX: 0,
    tileY: 0,
    x: 0,
    y: 0
  });
  const [tilesCtx, setTilesCtx] = useState<TilesType[]>([]);
  const [interactionCtx, setInteractionCtx] = useState<InteractionType>({
    menu: {
      selectedTile: null
    },
    canvas: {
      selectedTile: null,
      isDraggingTile: false
    }
  });
  return (
    <InteractionContext.Provider value={{ interactionCtx, setInteractionCtx }}>
      <TilesContext.Provider value={{ tilesCtx, setTilesCtx }}>
        <GridPositionContext.Provider value={{ posCtx, setPosCtx }}>
          <MouseTracker {...posCtx} />
          <LeftDrawerMenu />
          <Canvas cellSize={25} rowCount={100} columnCount={200} />
        </GridPositionContext.Provider>
      </TilesContext.Provider>
    </InteractionContext.Provider>
  );
}