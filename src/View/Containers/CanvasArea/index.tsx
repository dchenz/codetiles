import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CanvasArea from "./Canvas";

type PropTypes = {
  cellSize: number,
  rowCount: number,
  columnCount: number
}

export default function ZoomableCanvasArea({ cellSize, rowCount, columnCount }: PropTypes): JSX.Element {
  const canvasWidth = cellSize * columnCount;
  const canvasHeight = cellSize * rowCount;
  const initX = 0.5;
  const initY = 0.5;
  return (
    <TransformWrapper
      initialScale={1}
      centerOnInit={true}
      initialPositionX={canvasWidth * initX}
      initialPositionY={canvasHeight * initY}
      minScale={0.25}
      maxScale={4}
    >
      <TransformComponent wrapperStyle={{ width: "100vw", height: "100vh" }}>
        <CanvasArea
          width={canvasWidth}
          height={canvasHeight}
          cellSize={cellSize}
        >
        </CanvasArea>
      </TransformComponent>
    </TransformWrapper>
  );
}