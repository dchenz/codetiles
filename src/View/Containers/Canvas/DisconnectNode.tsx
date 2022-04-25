import React, { useContext } from "react";
import { XCircle } from "react-bootstrap-icons";
import { DisconnectorNodeProps } from "../../../types";
import { EditorContext } from "../../Context/EditorContext";
import "./styles.css";

export default function DisconnectNode(props: DisconnectorNodeProps) {
  const {editorCtx} = useContext(EditorContext);
  const onClick = () => {
    // Do not disconnect tiles when editor is prompting "discard changes"
    if (!editorCtx.closing) {
      props.onClick();
    }
  };
  return (
    <g className={editorCtx.closing ? undefined : "cursor-p"} onClick={onClick}>
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