import React from "react";
import { GridPositionType } from "../Context/GridPositionContext";

export default function MouseTracker(props: GridPositionType) {
  return (
    <div style={{ position: "absolute", top: 5, right: 5, zIndex: 999 }}>
      (X: {props.tileX}, Y: {props.tileY})
    </div>
  );
}