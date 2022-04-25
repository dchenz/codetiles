import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ExportButtons from "./ExportButtons";
import "./styles.css";
import { TileMenuTabs } from "./TileMenuTabs";
import { ToggleClose } from "./ToggleClose";

export function Menu(): JSX.Element {
  const [menuClosed, setMenuClosed] = useState(true);

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
            <ExportButtons basename="program" />
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
