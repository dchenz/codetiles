import fileDownload from "js-file-download";
import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TileInstanceType } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";
import { EditorContext } from "../../Context/EditorContext";
import "./styles.css";
import { TileMenuTabs } from "./TileMenuTabs";
import { ToggleClose } from "./ToggleClose";

export function Menu(): JSX.Element {
  const { tilesCtx } = useContext(TilesContext);
  const { editorCtx, setEditorCtx } = useContext(EditorContext);

  const onMenuToggle = (isClosed: boolean) => {
    if (!isClosed) {
      // Close editor on menu open
      editorCtx.editorState = null;
    }
    editorCtx.menuClosed = isClosed;
    setEditorCtx(editorCtx);
  };

  // Clear selection on drawer collapse toggle
  const cls = editorCtx.menuClosed ? "collapse-left-closed" : "collapse-left-open";
  return (
    <React.Fragment>
      <Container className={"left-drawer-container d-flex flex-column " + cls}>
        <Row>
          <Col>
            <h1>codetiles</h1>
          </Col>
        </Row>
        <Row className="flex-grow-1">
          <Col>
            <TileMenuTabs />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="export-button" onClick={() => saveTilesAsFile(tilesCtx)}>
              Export as JSON
            </Button>
          </Col>
        </Row>
        <ToggleClose
          isClosed={editorCtx.menuClosed}
          setClosed={() => onMenuToggle(!editorCtx.menuClosed)}
        />
      </Container>
    </React.Fragment>
  );
}

function saveTilesAsFile(tiles: TileInstanceType[]) {
  const program = {
    tiles: tiles.map(x => x.model.toObject())
  };
  // const entryTile = tiles.filter(x => x.model.type == "entry")[0].model;
  const dumpedText = JSON.stringify(program, (k, v) => v === undefined ? null : v, 4);
  fileDownload(dumpedText, "program.json");
}