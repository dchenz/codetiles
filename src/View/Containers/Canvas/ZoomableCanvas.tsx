import React, { useContext } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import GridBackdrop, { updateCanvasPositionState } from "./Canvas";
import { CanvasProps } from "../../../types";

export default function ZoomableCanvas({ cellSize, rowCount, columnCount }: CanvasProps): JSX.Element {
  const { interactionCtx } = useContext(InteractionContext);
  const { setPosCtx } = useContext(GridPositionContext);
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
      disabled={interactionCtx.canvas.isDraggingTile || interactionCtx.canvas.isDraggingConnector}
      onZoom={() => updateCanvasPositionState(setPosCtx, cellSize)}
      onZoomStop={() => updateCanvasPositionState(setPosCtx, cellSize)}
      onInit={(ref) => {
        interactionCtx.canvas.ref = ref;
      }}
    >
      <TransformComponent wrapperStyle={{ width: "100vw", height: "100vh" }}>
        <GridBackdrop
          rowCount={rowCount}
          columnCount={columnCount}
          cellSize={cellSize}
        />
      </TransformComponent>
    </TransformWrapper>
  );
}