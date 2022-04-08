import React, { useContext, useEffect, useRef } from "react";
import { GridPositionContext, GridPositionType } from "../../Context/GridPositionContext";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { getTileTemplate } from "../TileBlueprints";
import Tile from "./Tile";
import { CanvasProps } from "../../../types";
import { InteractionContext } from "../../Context/InteractionContext";
import "./styles.css";

let observer: MutationObserver | null = null;
let ofsX = 0; // Width of canvas outside of viewport
let ofsY = 0; // Height of canvas outside of viewport
let sc = 1; // Zoom scale factor
let mX = 0; // Mouse X position in viewport
let mY = 0; // Mouse Y position in viewport

export default function Canvas({ rowCount, columnCount, cellSize }: CanvasProps): JSX.Element {
  const ref = useRef<SVGSVGElement | null>(null);
  const { posCtx, setPosCtx } = useContext(GridPositionContext);
  const { interactionCtx: { menu, canvas }, setInteractionCtx } = useContext(InteractionContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);

  const width = cellSize * columnCount;
  const height = cellSize * rowCount;
  const tileSize = cellSize * 5;

  const addTileOnCanvas = (tileType: string, coordX: number, coordY: number) => {
    const tmpl = getTileTemplate(tileType);
    const tModel = new tmpl.modelClass();
    const ctx = {
      width: tileSize,
      height: tileSize,
      x: coordX - tileSize / 2,
      y: coordY - tileSize / 2,
      model: tModel,
      blueprint: tmpl
    };
    setTilesCtx([...tilesCtx, ctx]);
    // Clear selection on placement
    menu.selectedTile = null;
    setInteractionCtx({ menu, canvas });
  };

  const onCanvasClick = () => {
    if (menu.selectedTile) {
      addTileOnCanvas(menu.selectedTile, posCtx.x, posCtx.y);
    }
  };

  // Register observer to track SVG canvas offsets and scale
  useEffect(() => {
    if (observer == null && ref?.current?.parentNode) {
      observer = new MutationObserver((mutations) => updateContextOnMutation(mutations));
      observer.observe(ref.current.parentNode, {
        attributes: true
      });
      console.log("Observer started");
    }
  }, [ref, observer]);

  // Add listener to track mouse position on the canvas (SVG coordinates)
  useEffect(() => {
    document.body.addEventListener("mousemove", (e: MouseEventInit) => {
      mX = e.clientX ?? 0;
      mY = e.clientY ?? 0;
      updateCanvasPositionState(setPosCtx, cellSize);
    });
    addTileOnCanvas("entry", width / 2, height / 2);
  }, []);

  return (
    <svg ref={ref} style={{ width, height }} className="canvas-area" onClick={onCanvasClick}>
      <defs>
        <pattern id="grid" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
          <path d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} fill="none" stroke="gray" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {
        tilesCtx.map(ctx => <Tile key={ctx.model.id} {...ctx} />)
      }
      {
        menu.selectedTile != null ?
          <rect
            x={posCtx.x - tileSize / 2}
            y={posCtx.y - tileSize / 2}
            width={tileSize}
            height={tileSize}
            fill="none"
            stroke="red"
            strokeWidth="1"
          /> : null
      }
    </svg>
  );

}

export function updateCanvasPositionState(updateState: (_: GridPositionType) => void, cellSize: number) {
  const pX = (mX - ofsX) / sc;
  const pY = (mY - ofsY) / sc;
  updateState({
    tileX: Math.floor(pX / cellSize),
    tileY: Math.floor(pY / cellSize),
    x: pX,
    y: pY,
    zoom: sc
  });
}

function updateContextOnMutation(mutations: MutationRecord[]) {
  const cssStylePtn = /^translate3d\((-?\d+(\.\d+)?)px, (-?\d+(\.\d+)?)px, (-?\d+(\.\d+)?)px\) scale\((-?\d+(\.\d+)?)\)/;
  const styleMutations = mutations.filter((m) => m.type == "attributes" && m.attributeName == "style");
  for (const mt of styleMutations) {
    try {
      const value = (mt.target as HTMLElement)?.style?.transform;
      const groups = cssStylePtn.exec(value);
      if (groups == null) {
        throw 1;
      }
      ofsX = parseFloat(groups[1]);
      ofsY = parseFloat(groups[3]);
      sc = parseFloat(groups[7]);

    } catch (e) {
      console.error("Could not parse canvas style tag");
    }
    break;
  }
}
