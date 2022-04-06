import React, { useContext, useEffect, useRef } from "react";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { SelectionContext } from "../../Context/SelectionContext";
import { TilesContext } from "../../Context/TilesContext";
import { getTileTemplate } from "../TileManifest";
import Tile from "./Tile";
import { GridPropTypes } from "./types";

let observer: MutationObserver | null = null;
let x = 0;
let y = 0;
let sc = 1;

export default function Canvas({ rowCount, columnCount, cellSize }: GridPropTypes): JSX.Element {
  const ref = useRef<SVGSVGElement | null>(null);
  const { posCtx, setPosCtx } = useContext(GridPositionContext);
  const { selectionCtx, setSelectionCtx } = useContext(SelectionContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);

  useEffect(() => {
    if (observer == null && ref?.current?.parentNode) {
      observer = new MutationObserver((mutations) => updateContextOnMutation(mutations));
      observer.observe(ref.current.parentNode, {
        attributes: true
      });
      console.log("Observer started");
    }
  }, [ref, observer]);

  useEffect(() => {
    document.body.addEventListener("mousemove", (e: MouseEventInit) => {
      const pX = ((e.clientX ?? 0) - x) / sc;
      const pY = ((e.clientY ?? 0) - y) / sc;
      setPosCtx({
        tileX: Math.floor(pX / cellSize),
        tileY: Math.floor(pY / cellSize),
        x: pX,
        y: pY
      });
    });
  }, []);

  const width = cellSize * columnCount;
  const height = cellSize * rowCount;

  const tileSize = cellSize * 5;

  const onPlacement = () => {
    const tileType = selectionCtx.selected;
    if (tileType) {
      const tMafst = getTileTemplate(tileType);
      const tModel = new tMafst.model();
      const tile = {
        model: tModel,
        view:
          <Tile
            key={tModel.id}
            width={tileSize}
            height={tileSize}
            x={posCtx.x - tileSize / 2}
            y={posCtx.y - tileSize / 2}
            model={tModel}
            manifest={tMafst}
          />
      };
      setTilesCtx([...tilesCtx, tile]);
      // Clear selection on placement
      setSelectionCtx({ selected: null });
    }
  };

  return (
    <svg
      ref={ref}
      style={{ width, height, backgroundColor: "#f5f5f5" }}
      onClick={onPlacement}
    >
      <defs>
        <pattern id="grid" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
          <path d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} fill="none" stroke="gray" strokeWidth="1" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#grid)"
      />
      {
        tilesCtx.map(({ view }) => view)
      }
      {
        selectionCtx.selected != null ?
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
      x = parseFloat(groups[1]);
      y = parseFloat(groups[3]);
      sc = parseFloat(groups[7]);

    } catch (e) {
      console.error("Could not parse canvas style tag");
    }
    break;
  }
}
