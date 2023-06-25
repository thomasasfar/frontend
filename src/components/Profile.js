import React, { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import profilePhoto from "../assets/images/profil.svg";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/profile");
      const userData = response.data;
      console.log(userData[0]);
      setName(userData[0].name);
      setUsername(userData[0].username);
      setEmail(userData[0].email);
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("avatar", selectedImage);

      const requestOptions = {
        method: "POST",
        credentials: "include",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(
        "http://localhost:3000/users/edit",
        requestOptions
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    setEditMode(false);
    try {
      await axios.post("http://localhost:3000/users/edit", {
        name,
        username,
        email,
      });
    } catch (error) {
      console.log("Error updating profile data:", error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={8}>
            <Card style={{ borderRadius: ".5rem" }}>
              <Card.Body className="row g-0">
                <Col md={4} className="text-center">
                  <Image
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : profilePhoto
                    }
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "120px" }}
                    rounded
                  />
                  <Button
                    className="button-ganti-foto"
                    variant="dark"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Picture
                  </Button>
                  <Form.Control
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </Col>
                <Col md={8}>
                  <div className="card-body p-4">
                    <h6>My Profile</h6>
                    <hr className="mt-0 mb-4" />

                    <Form id="profile">
                      <Form.Group
                        as={Row}
                        className="form-outline mb-3"
                        controlId="name"
                      >
                        <Form.Label column sm={3}>
                          Nama
                        </Form.Label>

                        <Col sm={9}>
                          {editMode ? (
                            <Form.Control
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                              }}
                            />
                          ) : (
                            <Form.Control
                              plaintext
                              readOnly
                              defaultValue={name}
                              onClick={handleEdit}
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                                cursor: "pointer",
                              }}
                            />
                          )}
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
                          {editMode ? (
                            <Form.Control
                              type="text"
                              placeholder={username}
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                              }}
                            />
                          ) : (
                            <Form.Control
                              plaintext
                              readOnly
                              defaultValue={username}
                              onClick={handleEdit}
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="form-outline mb-3 "
                        controlId="email"
                      >
                        <Form.Label column sm={3}>
                          Email
                        </Form.Label>
                        <Col sm={9}>
                          {editMode ? (
                            <Form.Control
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                              }}
                            />
                          ) : (
                            <Form.Control
                              plaintext
                              readOnly
                              defaultValue={email}
                              onClick={handleEdit}
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </Col>
                      </Form.Group>
                    </Form>

                    <Row>
                      <Col md={{ span: 2, offset: 8 }} sm={6}>
                        <Button
                          variant="secondary"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col md={{ span: 2 }} sm={5}>
                        <Button variant="primary" onClick={handleSave}>
                          Save
                        </Button>
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
