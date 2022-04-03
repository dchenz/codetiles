import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.css";

export default function BottomDrawerMenu() {
  const [isCollapsed, setCollapsed] = useState(true);
  const collapseStyleCls = isCollapsed ? "collapse-bottom-closed" : "collapse-bottom-open";
  return (
    <Container fluid className={"bottom-drawer-container " + collapseStyleCls}>
      <Row>
        <Col>
          <h2>details</h2>
        </Col>
      </Row>
    </Container>
  );
}