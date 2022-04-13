import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { EditorContext } from "../../Context/EditorContext";
import "./styles.css";

export function Editor(): JSX.Element {
  const { editorCtx, setEditorCtx } = useContext(EditorContext);
  const tile = editorCtx.editorState;
  if (tile == null) {
    return (
      <Container fluid className={"bottom-drawer-container collapse-bottom-closed"}>
      </Container>
    );
  }
  return (
    <Container fluid className={"bottom-drawer-container collapse-bottom-open"}>
      <Row>
        <Col>
          <h4>{tile?.title}
            <button className="editor-close-btn" onClick={() => {
              editorCtx.editorState = null;
              setEditorCtx(editorCtx);
            }}>
              <XLg size={36} />
            </button>
          </h4>
        </Col>
      </Row>
      {
        Object.entries(tile.attributes).map(([k]) =>
          <Row key={k}>
            <Col>
              {k}
            </Col>
          </Row>
        )
      }
    </Container>
  );
}