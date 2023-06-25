import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap";
import "../styles/Profile.css"
import profilePhoto from "../assets/images/profil.svg"

const Profile = () => {
  
  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6} lg={6}>
            <Card style={{ borderRadius: '.5rem' }}>
              <Card.Body className="row g-0">
                <Col md={4} className="text-center">
                  <Image
                    src={profilePhoto}
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: '120px' }}
                    rounded
                  />
                  <Button className="button-ganti-foto">Change Picture</Button>
                </Col>
                <Col md={8}>
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">info@example.com</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Recent</h6>
                        <p className="text-muted">Lorem ipsum</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Most Viewed</h6>
                        <p className="text-muted">Dolor sit amet</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <i className="fab fa-facebook-f fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>
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
