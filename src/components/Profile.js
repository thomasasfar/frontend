import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import "../styles/Profile.css";
import profilePhoto from "../assets/images/profil.svg";


const Profile = () => {
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={8}>
            <Card style={{ borderRadius: ".5rem" }}>
              <Card.Body className="row g-0">
                <Col md={4} className="text-center">
                  <Image
                    src={profilePhoto}
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "120px" }}
                    rounded
                  />
                  <Button className="button-ganti-foto" variant="dark">
                    Change Picture
                  </Button>
                </Col>
                <Col md={8}>
                  <div className="card-body p-4">
                    <h6>My Profile</h6>
                    <hr className="mt-0 mb-4" />

                    <Row>
                      <Form id="profile">
                        <Form.Group
                          as={Row}
                          className="form-outline mb-3"
                          controlId="nama"
                        >
                          <Form.Label column sm={3}>
                            Nama
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              placeholder="Enter your name"
                              readOnly
                              style={{ border: "none",borderRadius: 0, borderBottom: "1px solid #ced4da" }}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className="form-outline mb-3"
                          controlId="username"
                        >
                          <Form.Label column sm={3}>
                            Username
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              placeholder="Enter your name"
                              readOnly
                              style={{ border: "none",borderRadius: 0, borderBottom: "1px solid #ced4da" }}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className="form-outline mb-3 "
                          controlId="email"
                        >
                          <Form.Label column sm={3}>
                            Email
                          </Form.Label >
                          <Col sm={9}>
                            <Form.Control
                              type="email"
                              placeholder="Enter your name"
                              readOnly
                              style={{ border: "none",borderRadius: 0, borderBottom: "1px solid #ced4da" }}
                            />
                          </Col>
                        </Form.Group>
                      </Form>
                    </Row>
                    <Row>
                      <Col md={{ span: 2, offset: 8 }} sm={6}>
                        <Button variant="secondary" style={{ visibility: "hidden" }}>Cancel</Button>
                      </Col>
                      <Col md={{ span: 2,}} sm={6}>
                        <Button variant="primary">Edit</Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
