import React, { useContext, useEffect, useRef } from "react";
import { GridPositionContext, GridPositionType } from "../../Context/GridPositionContext";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { getTileTemplate } from "../TileBlueprints";
import Tile from "./Tile";
import { CanvasProps, TileInstanceType } from "../../../types";
import { InteractionContext } from "../../Context/InteractionContext";
import "./styles.css";
import { ProgramObject } from "../../../Model/ProgramObject";
import ConnectorLine from "./ConnectorLine";
import { getHypotenuse } from "./mathutils";

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
    const tModel = new tmpl.modelClass(tmpl.displayName);
    const ctx = {
      width: tileSize,
      height: tileSize,
      x: coordX - tileSize / 2,
      y: coordY - tileSize / 2,
      model: tModel,
      blueprint: tmpl,
      connectorHover: null,
      priority: 50
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
        tilesCtx.map(ctx =>
          ctx.model.outboundConnectors.map((conn, k) =>
            <ConnectorLine
              key={ctx.model.id + k}
              model={conn}
              tileInstance={ctx}
              startPoint={{
                x: ctx.x + ctx.width / 2,
                y: ctx.y + ctx.height / 2
              }}
              initDegrees={k * 360 / ctx.model.outboundConnectors.length + 90}
              minLength={getHypotenuse(ctx.width / 2, ctx.height / 2)}
            />
          )
        )
      }
      {
        tilesCtx.sort((a, b) => a.priority > b.priority ? -1 : 1).map(ctx =>
          <Tile
            key={ctx.model.id}
            instance={ctx}
            onTileDragStart={() => {
              canvas.isDraggingTile = true;
              setInteractionCtx({ menu, canvas });
              setTilesCtx(putTileOnTop(tilesCtx, ctx.model));
            }}
            onTileDragEnd={() => {
              canvas.isDraggingTile = false;
              setInteractionCtx({ menu, canvas });
            }}
          />
        )
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

function putTileOnTop(tilesCtx: TileInstanceType[], model: ProgramObject): TileInstanceType[] {
  for (let i = 0; i < tilesCtx.length; i++) {
    if (tilesCtx[i].model.id == model.id) {
      tilesCtx[i].priority = 50;
    } else {
      tilesCtx[i].priority = 100;
    }
  }
  return tilesCtx;
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
