import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { EditorContext } from "../../Context/EditorContext";
import AttributeForm from "./AttributeForm";
import "./styles.css";

export function Editor(): JSX.Element {
  const { editorCtx, setEditorCtx } = useContext(EditorContext);
  const { tilesCtx, setTilesCtx } = useContext(TilesContext);
  const tile = editorCtx.editorState;
  if (tile == null) {
    return (
      <Container fluid className={"editor-container collapse-editor-closed"}>
      </Container>
    );
  }

  const onClose = () => {
    editorCtx.editorState = null;
    editorCtx.closing = false;
    editorCtx.hasChanges = false;
    setEditorCtx(editorCtx);
  };

  const onSave = () => {
    setTilesCtx(tilesCtx);
    onClose();
  };

  const onCancel = () => {
    if (editorCtx.hasChanges) {
      editorCtx.closing = true;
      setEditorCtx(editorCtx);
    } else {
      onClose();
    }
  };

  return (
    <Container fluid className={"editor-container collapse-editor-open"}>
      <Row>
        <Col>
          <h5>
            {tile?.title}
          </h5>
          <AttributeForm
            tile={tile}
            onSave={onSave}
            onCancel={onCancel}
          />
          {
            editorCtx.closing ?
              <div className="confirm-close-overlay">
                <div className="confirm-close-inner">
                  <p className="confirm-close-title">
                    Discard changes?
                  </p>
                  <div className="confirm-close-btn-container">
                    <Button variant="light" onClick={onClose}>
                      Yes
                    </Button>
                    <Button variant="light" onClick={() => {
                      editorCtx.closing = false;
                      setEditorCtx(editorCtx);
                    }}>
                      No
                    </Button>
                  </div>
                </div>
              </div> : null
          }
          {/* <button onClick={() => {
            setTilesCtx(tilesCtx.filter((t) => t.model.id != editorCtx.editorState?.id));
            onClose();
          }}>
            <Trash3 size={24} />
          </button> */}
        </Col>
      </Row>
    </Container>
  );
}