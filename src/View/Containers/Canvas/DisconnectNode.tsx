import React, { useContext } from "react";
import { XCircle } from "react-bootstrap-icons";
import { DisconnectorNodeProps } from "../../../types";
import { EditorContext } from "../../Context/EditorContext";

export default function DisconnectNode(props: DisconnectorNodeProps) {
  const {editorCtx} = useContext(EditorContext);
  const onClick = () => {
    // Do not disconnect tiles when editor is prompting "discard changes"
    if (!editorCtx.closing) {
      props.onClick();
    }
  };
  const connCursorStyle = editorCtx.closing ? "default" : "pointer";
  return (
    <g style={{ cursor: connCursorStyle }} onClick={onClick}>
      <rect
        x={props.position.x - props.size / 2}
        y={props.position.y - props.size / 2}
        width={props.size}
        height={props.size}
        rx={50} ry={50}
        fill="#ffffff"
      />
      <XCircle
        x={props.position.x - props.size / 2}
        y={props.position.y - props.size / 2}
        width={props.size}
        height={props.size}
        fill="#000000"
      />
    </g>
  );
}