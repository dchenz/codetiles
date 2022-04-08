import React, { useContext } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { ProgramObject } from "../../../Model/ProgramObject";
import { TileInstanceType, TileProps } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { GridPositionContext } from "../../Context/GridPositionContext";
import { InteractionContext } from "../../Context/InteractionContext";
import ConnectorLine from "./ConnectorLine";

const iconSize = 42;

export default function Tile({ instance, ...props }: TileProps): JSX.Element {
  const { interactionCtx, setInteractionCtx } = useContext(InteractionContext);
  const { posCtx } = useContext(GridPositionContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);
  const ctx = tilesCtx.filter(x => x.model.id == instance.model.id)[0];

  const handleTileDragStart = () => {
    interactionCtx.canvas.isDraggingTile = true;
    setInteractionCtx(interactionCtx);
    setTilesCtx(putTileOnTop(tilesCtx, instance.model));
  };

  const handleTileDrag = (_: unknown, data: DraggableData) => {
    // ctx points to object inside context's array
    ctx.x = data.x;
    ctx.y = data.y;
    setTilesCtx(tilesCtx);
  };

  const handleTileDragStop = () => {
    interactionCtx.canvas.isDraggingTile = false;
    setInteractionCtx(interactionCtx);
  };

  const centerPointAbs = {
    x: ctx.x + instance.width / 2,
    y: ctx.y + instance.height / 2
  };

  const centerPointRel = {
    x: instance.width / 2,
    y: instance.height / 2
  };

  return (
    <React.Fragment>
      {
        instance.model.outboundConnectors.map((conn, k) =>
          <ConnectorLine
            key={k}
            model={conn}
            startPoint={centerPointAbs}
            initDegrees={k * 360 / instance.model.outboundConnectors.length + 90}
          />
        )
      }
      <Draggable
        defaultPosition={{ x: ctx.x, y: ctx.y }}
        onStart={handleTileDragStart}
        onDrag={handleTileDrag}
        onStop={handleTileDragStop}
        scale={posCtx.zoom}
      >
        <g style={{ cursor: "pointer"}}>
          <rect
            width={instance.width}
            height={instance.height}
            {...instance.blueprint?.attributes}
          />
          <text
            transform={`translate(${centerPointRel.x}, ${instance.height * 0.75})`}
            textAnchor="middle"
            fontSize={16}
            fill="#000000"
          >
            {instance.blueprint.displayName}
          </text>
          {
            React.cloneElement(instance.blueprint.icon, {
              size: iconSize,
              transform: `translate(${centerPointRel.x - iconSize / 2}, ${instance.height * 0.25})`
            })
          }
        </g>
      </Draggable>
    </React.Fragment>
  );
}



function putTileOnTop(tilesCtx: TileInstanceType[], model: ProgramObject): TileInstanceType[] {
  let idx = 0;
  for (let i = 0; i < tilesCtx.length; i++) {
    if (tilesCtx[i].model.id == model.id) {
      idx = i;
      break;
    }
  }
  const tiles = [...tilesCtx];
  const t = tiles.splice(idx, 1)[0];
  tiles.push(t);
  return tiles;
}