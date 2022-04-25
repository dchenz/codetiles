import React, { useContext } from "react";
import Draggable from "react-draggable";
import { ConnectorNodeProps } from "../../../types";
import { EditorContext } from "../../Context/EditorContext";
import "./styles.css";

const noop = () => { return; };

export default function ConnectNode(props: ConnectorNodeProps) {
  const { editorCtx } = useContext(EditorContext);
  return (
    <Draggable
      position={props.position}
      onStart={editorCtx.closing ? noop : props.onDragStart}
      onDrag={editorCtx.closing ? noop : props.onDrag}
      onStop={editorCtx.closing ? noop : props.onDragStop}
      scale={props.zoom}
      disabled={editorCtx.closing}
    >
      <rect
        className={editorCtx.closing ? undefined : "cursor-p"}
        x={props.size / -2}
        y={props.size / -2}
        width={props.size}
        height={props.size}
        fill="#000000"
      />
    </Draggable>
  );
}