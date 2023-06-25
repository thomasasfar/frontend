import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "../styles/Dash.css";
import axios from "axios";

const Dash = () => {

  return (
    <div className="badan-dash">
      <Container className="mt-5 mb-5 px-5 pb-5">
        <Row>
          <i>Welcome </i>
        </Row>
        <Row>
          <Col sm={6}>
            <Container className="kolom border">
              <Row>
                <Col sm={6} className="border">
                  <h1>HE</h1>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col sm={6} className="border">
            sm=4
          </Col>
        </Row>
        <Row>
          <Col>sm=true</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dash;
