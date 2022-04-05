import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ChevronCompactLeft, ChevronCompactRight } from "react-bootstrap-icons";
import { SelectionContext } from "../../Context/SelectionContext";
import "./styles.css";
import TileList from "./TileList";

export default function LeftDrawerMenu(): JSX.Element {
  // Clear selection on drawer collapse toggle
  const { setSelectionCtx } = useContext(SelectionContext);
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
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
            <TileList />
          </Col>
        </Row>
        <div
          className="toggle-collapse-btn"
          onClick={() => {
            setCollapsed(!isCollapsed);
            setSelectionCtx({ selected: "" });
          }}
        >
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