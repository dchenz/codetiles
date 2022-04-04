import React, { useState } from "react";
import ZoomableCanvasArea from "./View/Containers/CanvasArea";
import UserControls from "./View/Containers/UserControls";
import { CanvasContext, CanvasLayout } from "./View/Context/CanvasContext";

export default function App(): JSX.Element {
  const [layoutCtx, setLayoutCtx] = useState<CanvasLayout>({
    ofsX: 0,
    ofsY: 0,
    scale: 1
  });
  return (
    <CanvasContext.Provider value={{ layoutCtx, setLayoutCtx }}>
      <UserControls />
      <ZoomableCanvasArea />
    </CanvasContext.Provider>
  );
}

