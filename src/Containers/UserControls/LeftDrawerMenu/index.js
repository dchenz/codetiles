import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ChevronCompactLeft, ChevronCompactRight } from "react-bootstrap-icons";
import "./styles.css";

export default function LeftDrawerMenu() {
  const [isCollapsed, setCollapsed] = useState(false);
  const collapseStyleCls = isCollapsed ? "collapse-left-closed" : "collapse-left-open";
  return (
    <React.Fragment>
      <Container className={"left-drawer-container " + collapseStyleCls}>
        <Row>
          <Col>
            <h1>codetiles</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Add tile</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Add control</p>
          </Col>
        </Row>
        <div className="toggle-collapse-btn" onClick={() => setCollapsed(!isCollapsed)}>
          {
            isCollapsed ?
              <ChevronCompactRight size={24} /> :
              <ChevronCompactLeft size={24} />
          }
        </div>
      </Container>
    </React.Fragment>
  );
}