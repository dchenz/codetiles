import React, { useContext } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { TileProps } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { GridPositionContext } from "../../Context/GridPositionContext";
import ConnectorLine from "./ConnectorLine";
import { getHypotenuse } from "./mathutils";

const iconSize = 42;

export default function Tile({ instance, ...props }: TileProps): JSX.Element {
  const { posCtx } = useContext(GridPositionContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);

  const handleTileDrag = (_: unknown, data: DraggableData) => {
    // ctx points to object inside context's array
    instance.x = data.x;
    instance.y = data.y;
    setTilesCtx(tilesCtx);
  };

  return (
    <React.Fragment>
      {
        instance.model.outboundConnectors.map((conn, k) =>
          <ConnectorLine
            key={k}
            model={conn}
            startPoint={{
              x: instance.x + instance.width / 2,
              y: instance.y + instance.height / 2
            }}
            initDegrees={k * 360 / instance.model.outboundConnectors.length + 90}
            minLength={getHypotenuse(instance.width / 2, instance.height / 2)}
          />
        )
      }
      <Draggable
        defaultPosition={{ x: instance.x, y: instance.y }}
        onStart={props.onTileDragStart}
        onDrag={handleTileDrag}
        onStop={props.onTileDragEnd}
        scale={posCtx.zoom}
      >
        <g style={{ cursor: "pointer"}}>
          <rect
            width={instance.width}
            height={instance.height}
            {...instance.blueprint?.attributes}
          />
          <text
            transform={`translate(${instance.width / 2}, ${instance.height * 0.75})`}
            textAnchor="middle"
            fontSize={16}
            fill="#000000"
          >
            {instance.blueprint.displayName}
          </text>
          {
            React.cloneElement(instance.blueprint.icon, {
              size: iconSize,
              transform: `translate(${instance.width / 2 - iconSize / 2}, ${instance.height * 0.25})`
            })
          }
        </g>
      </Draggable>
    </React.Fragment>
  );
}

