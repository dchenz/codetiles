import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CanvasArea from "./Canvas";

export default function ZoomableCanvasArea() {
  const canvasWidth = window.innerWidth * 4;
  const canvasHeight = window.innerHeight * 4;
  const initX = 0.5;
  const initY = 0.5;
  return (
    <TransformWrapper
      initialScale={1}
      centerOnInit={true}
      initialPositionX={canvasWidth * initX}
      initialPositionY={canvasHeight * initY}
      minScale={0.25}
    >
      <TransformComponent wrapperStyle={{width: "100vw", height: "100vh"}}>
        <CanvasArea
          width={canvasWidth}
          height={canvasHeight}
        >

        </CanvasArea>
      </TransformComponent>
    </TransformWrapper>
  );
}