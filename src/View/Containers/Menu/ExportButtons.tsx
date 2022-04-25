import fileDownload from "js-file-download";
import React, { forwardRef, Ref, useContext } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import { saveSvg } from "save-svg-as-png";
import { ExportButtonProps, TileInstanceType } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";

export default function ExportButtons(props: ExportButtonProps) {
  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={<ExportOptionsPopup {...props} />}
      rootClose
    >
      <div className="d-grid">
        <Button variant="light" size="lg">
          <Download size={24} /> &nbsp;
          <span>Download</span>
        </Button>
      </div>
    </OverlayTrigger>
  );
}

const ExportOptionsPopup = forwardRef((props: ExportButtonProps, ref: Ref<HTMLDivElement>) => {
  const { tilesCtx } = useContext(TilesContext);

  return (
    <Popover {...props} ref={ref}>
      <Popover.Body>
        <Button
          className="mx-1"
          variant="dark"
          onClick={() => saveCanvasAsSvg(tilesCtx, props.basename, true)}
        >
          SVG
        </Button>
        <Button
          className="mx-1"
          variant="dark"
          onClick={() => saveCanvasAsJSON(tilesCtx, props.basename)}
        >
          JSON
        </Button>
      </Popover.Body>
    </Popover>
  );
});
ExportOptionsPopup.displayName = "ExportOptionsPopup";


function saveCanvasAsSvg(tiles: TileInstanceType[], basename: string, trimmed?: boolean) {
  const svgElement = document.getElementById("canvas-area")?.cloneNode(true) as Element;
  if (!svgElement) {
    console.error("Could not find canvas element");
    return;
  }
  stripUselessAttributes(svgElement);
  if (trimmed) {
    const cropped = getCroppedDimensions(tiles);
    const background = svgElement.children[1];
    background.setAttribute("x", cropped.x.toString());
    background.setAttribute("y", cropped.y.toString());
    saveSvg(svgElement, `${basename}.svg`, {
      scale: 480 / cropped.height,
      top: cropped.top,
      left: cropped.left,
      width: cropped.width,
      height: cropped.height,
      excludeCss: true
    });
  } else {
    const rect = svgElement.getBoundingClientRect();
    saveSvg(svgElement, `${basename}.svg`, {
      top: 0,
      left: 0,
      width: rect.width,
      height: rect.height,
      excludeCss: true
    });
  }

}

function stripUselessAttributes(svgElement: Element) {

  function removeAttributesRecursive(root: Element) {
    if (!root) {
      return;
    }
    if (root.tagName == "g" || root.tagName == "rect") {
      // Remove all CSS classes since it's not exported to file
      root.removeAttribute("class");
      // Remove all empty inline styles (produced by React Draggable)
      if (root.getAttribute("style") == "") {
        root.removeAttribute("style");
      }
      // Selected tiles should appear as normal in output
      // This is the only way to distinguish them at DOM level
      if (root.tagName == "rect"
        && root.getAttribute("stroke-width") == "4"
        && root.getAttribute("stroke") == "#0000ff"
      ) {
        root.setAttribute("stroke-width", "1");
        root.setAttribute("stroke", "#000000");
      }
    }
    for (const child of root.children) {
      removeAttributesRecursive(child);
    }
  }

  // Remove ID on main SVG element
  svgElement.removeAttribute("id");
  removeAttributesRecursive(svgElement);
}

function getCroppedDimensions(tiles: TileInstanceType[]): DOMRect {

  const xCoords = tiles.map((t) => t.x);
  const yCoords = tiles.map((t) => t.y);

  const minSvgSize = 300;
  // Temporary. Will optimise code later
  const tileSize = 125;
  const borderSize = tileSize;

  let minX = Math.min(...xCoords) - borderSize;
  let minY = Math.min(...yCoords) - borderSize;
  let maxX = Math.max(...xCoords) + tileSize + borderSize;
  let maxY = Math.max(...yCoords) + tileSize + borderSize;
  if (maxX - minX < minSvgSize) {
    minX = (minX + maxX - minSvgSize) / 2;
    maxX = minX + minSvgSize;
  }
  if (maxY - minY < minSvgSize) {
    minY = (minY + maxY - minSvgSize) / 2;
    maxY = minY + minSvgSize;
  }

  return {
    x: minX, y: minY,
    top: minY, left: minX, right: maxX, bottom: maxY,
    width: maxX - minX, height: maxY - minY,
    toJSON: () => { return; } // don't need this
  };
}

function saveCanvasAsJSON(tiles: TileInstanceType[], basename: string) {
  const program = {
    tiles: tiles.map(x => x.model.toObject())
  };
  const dumpedText = JSON.stringify(program, (k, v) => v === undefined ? null : v, 4);
  fileDownload(dumpedText, `${basename}.json`);
}