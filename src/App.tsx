import React, { useState } from "react";
import MouseTracker from "./View/Components/MouseTracker";
import { Canvas } from "./View/Containers/Canvas";
import LeftDrawerMenu from "./View/Containers/LeftDrawerMenu";
import { GridPositionContext, GridPositionType } from "./View/Context/GridPositionContext";
import { SelectionContext, SelectionType } from "./View/Context/SelectionContext";
import { TilesContext, TilesType } from "./View/Context/TilesContext";

export default function App(): JSX.Element {
  const [posCtx, setPosCtx] = useState<GridPositionType>({
    tileX: 0,
    tileY: 0,
    x: 0,
    y: 0
  });
  const [tilesCtx, setTilesCtx] = useState<TilesType[]>([]);
  const [selectionCtx, setSelectionCtx] = useState<SelectionType>({
    selected: null
  });
  return (
    <SelectionContext.Provider value={{ selectionCtx, setSelectionCtx }}>
      <TilesContext.Provider value={{ tilesCtx, setTilesCtx }}>
        <GridPositionContext.Provider value={{ posCtx, setPosCtx }}>
          <MouseTracker {...posCtx} />
          <LeftDrawerMenu />
          <Canvas cellSize={25} rowCount={100} columnCount={200} />
        </GridPositionContext.Provider>
      </TilesContext.Provider>
    </SelectionContext.Provider>
  );
}