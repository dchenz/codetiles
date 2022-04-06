import React, { useContext } from "react";
import { GridPositionContext } from "../Context/GridPositionContext";

export default function MouseTracker(): JSX.Element {
  const { posCtx } = useContext(GridPositionContext);
  return (
    <div style={{ position: "absolute", top: 5, right: 5, zIndex: 999, textAlign: "right" }}>
      <div>
        ROW: {posCtx.tileY}, COL: {posCtx.tileX}
      </div>
      <div>
        X: {posCtx.x.toFixed(2)}, Y: {posCtx.y.toFixed(2)}
      </div>
      <div>
        SCALE: {posCtx.zoom.toFixed(3)}
      </div>
    </div>
  );
}