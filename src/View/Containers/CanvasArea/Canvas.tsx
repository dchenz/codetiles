import React, { useContext, useEffect, useRef } from "react";
import { CanvasContext, CanvasLayout } from "../../Context/CanvasContext";

let observer: MutationObserver | null = null;

type PropTypes = {
  width: number,
  height: number,
  cellSize: number,
  children?: React.ReactNode
}

export default function CanvasArea({ width, height, cellSize, children }: PropTypes): JSX.Element {

  const { setLayoutCtx } = useContext(CanvasContext);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (observer == null && ref?.current?.parentNode) {
      observer = new MutationObserver((mutations) => updateContextOnMutation(mutations, setLayoutCtx));
      observer.observe(ref.current.parentNode, {
        attributes: true
      });
      console.log("Observer started");
    }
  }, [ref, observer]);

  const outerGridSize = Math.floor(cellSize / 5) * 5;
  const innerGridSize = Math.floor(outerGridSize / 5);

  return (
    <svg ref={ref} style={{ width, height, backgroundColor: "#f5f5f5" }} >
      <defs>
        <pattern id="smallGrid" width={innerGridSize} height={innerGridSize} patternUnits="userSpaceOnUse">
          <path d={`M ${innerGridSize} 0 L 0 0 0 ${innerGridSize}`} fill="none" stroke="gray" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid" width={outerGridSize} height={outerGridSize} patternUnits="userSpaceOnUse">
          <rect width={outerGridSize} height={outerGridSize} fill="url(#smallGrid)" />
          <path d={`M ${outerGridSize} 0 L 0 0 0 ${outerGridSize}`} fill="none" stroke="gray" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {children}
    </svg>
  );

}

function updateContextOnMutation(mutations: MutationRecord[], setContext: (_: CanvasLayout) => void) {
  const cssStylePtn = /^translate3d\((-?\d+(\.\d+)?)px, (-?\d+(\.\d+)?)px, (-?\d+(\.\d+)?)px\) scale\((-?\d+(\.\d+)?)\)/;
  const styleMutations = mutations.filter((m) => m.type == "attributes" && m.attributeName == "style");
  for (const mt of styleMutations) {
    try {
      const value = (mt.target as HTMLElement)?.style?.transform;
      const groups = cssStylePtn.exec(value);
      if (groups == null) {
        throw 1;
      }
      const updatedContext = {
        ofsX: parseFloat(groups[1]),
        ofsY: parseFloat(groups[3]),
        scale: parseFloat(groups[7])
      };
      setContext(updatedContext);
    } catch (e) {
      console.error("Could not parse canvas style tag");
    }
    break;
  }
}