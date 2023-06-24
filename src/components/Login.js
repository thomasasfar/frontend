import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/Login.css";

const Login = () => {
  return (
    <div>
      <section className="vh-100">
        <Container fluid className="h-custom">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col
              md={8}
              lg={6}
              xl={4}
              offset={{ xl: 0 }}
              className="mt-5 px-3 py-5"
            >
              <Form id="login">
                <div className="card-body p-3 text-center">
                  <i className="judul">Sign in to Kumpulin</i>
                </div>

                {/* Kasih kolom */}
                <Container className="kolom pt-3 px-4">
                  {/* Username input */}
                  <Form.Group
                    className="form-outline mb-4 "
                    controlId="username"
                  >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      size="lg"
                    />
                  </Form.Group>

                  {/* Password input */}
                  <Form.Group
                    className="form-outline mb-3"
                    controlId="password"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      size="lg"
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center">
                    <a href="#!" className="text-body">
                      Forgot password?
                    </a>
                  </div>

                  <div className="text-center text-lg-start">
                    <div className="card-body py-3 text-center">
                      <a href="dash.html" className="d-grid">
                        <Button type="submit" variant="primary" size="lg">
                          Sign in
                        </Button>
                      </a>
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?
                        <a href="register" className="link-danger">
                          Register
                        </a>
                      </p>
                    </div>
                  </div>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Login;
