import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "../styles/Dash.css";

const Dash = () => {
  return (
    <div>
      <Container className="mt-5 mb-5 px-5 pb-5">
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
        <Col sm={6} className="border">sm=4</Col>
      </Row>
      <Row>
        <Col>sm=true</Col>
      </Row>
      </Container>
    </div>
  );
};

export default Dash;
