import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.css";
import { TileMenuTabs } from "./TileMenuTabs";
import { ToggleClose } from "./ToggleClose";

export function Menu(): JSX.Element {
  // Clear selection on drawer collapse toggle
  const [isClosed, setClosed] = useState<boolean>(false);
  const cls = isClosed ? "collapse-left-closed" : "collapse-left-open";
  return (
    <React.Fragment>
      <Container className={"left-drawer-container " + cls}>
        <Row>
          <Col>
            <h1>codetiles</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <TileMenuTabs />
          </Col>
        </Row>
        <ToggleClose isClosed={isClosed} setClosed={setClosed} />
      </Container>
    </React.Fragment>
  );
}