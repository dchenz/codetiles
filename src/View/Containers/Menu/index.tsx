import fileDownload from "js-file-download";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TileInstanceType } from "../../../types";
import { TilesContext } from "../../Context/ActiveTilesContext";
import "./styles.css";
import { TileMenuTabs } from "./TileMenuTabs";
import { ToggleClose } from "./ToggleClose";

export function Menu(): JSX.Element {
  const [menuClosed, setMenuClosed] = useState(true);
  const { tilesCtx } = useContext(TilesContext);

  // Clear selection on drawer collapse toggle
  const cls = menuClosed ? "collapse-menu-closed" : "collapse-menu-open";
  return (
    <React.Fragment>
      <Container className={"menu-container d-flex flex-column " + cls}>
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
          isClosed={menuClosed}
          setClosed={() => setMenuClosed(!menuClosed)}
        />
      </Container>
    </React.Fragment>
  );
}

function saveTilesAsFile(tiles: TileInstanceType[]) {
  const program = {
    tiles: tiles.map(x => x.model.toObject())
  };
  const dumpedText = JSON.stringify(program, (k, v) => v === undefined ? null : v, 4);
  fileDownload(dumpedText, "program.json");
}