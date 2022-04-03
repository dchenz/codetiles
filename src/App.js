import React from "react";
import ZoomableCanvasArea from "./Containers/CanvasArea";
import UserControls from "./Containers/UserControls";

export default function App() {
  return (
    <div>
      <UserControls />
      <ZoomableCanvasArea />
    </div>
  );
}

