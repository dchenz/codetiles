import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import GridBackdrop from "./Canvas";
import { GridPropTypes } from "./types";

export default function ZoomableCanvas({ cellSize, rowCount, columnCount }: GridPropTypes): JSX.Element {
  const canvasWidth = cellSize * columnCount;
  const canvasHeight = cellSize * rowCount;
  const initX = 0.5;
  const initY = 0.5;




  return (
    <React.Fragment>

      <TransformWrapper
        initialScale={1}
        centerOnInit={true}
        initialPositionX={canvasWidth * initX}
        initialPositionY={canvasHeight * initY}
        minScale={0.25}
        maxScale={4}
      >
        <TransformComponent wrapperStyle={{ width: "100vw", height: "100vh" }}>
          <GridBackdrop
            rowCount={rowCount}
            columnCount={columnCount}
            cellSize={cellSize}
          />
        </TransformComponent>
      </TransformWrapper>

    </React.Fragment>
  );
}