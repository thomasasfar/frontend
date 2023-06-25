import React, { useEffect, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import Avatar from "react-avatar-edit";
import "./style.css";
import {
  Container,
  Row,
  Col,
  Card,
  // Button,
  Form,
  // Image,
} from "react-bootstrap";
import "../styles/Profile.css";
import profilePhoto from "../assets/images/profile.svg";
import pPhoto from "../assets/images/photo.png";

const Profile = () => {
  const [avatarURL, setAvatarURL] = useState(null);

  const requestOptions = {
    method: "GET",
    credentials: "include",
    redirect: "follow",
  };

  useEffect(() => {
    fetch("http://localhost:3000/avatar", requestOptions) // Ganti dengan URL endpoint server yang sesuai
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Terjadi kesalahan saat mengambil avatar");
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setAvatarURL(url);
      })
      .catch((error) => {
        console.error(error);
        setAvatarURL(profilePhoto);
      });
  }, []);

  const [dialogs, setdialogs] = useState(false);
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleUploadButtonClick = (file) => {
    var formdata = new FormData();
    formdata.append("avatar", image);

    var requestOptions = {
      method: "POST",
      body: formdata,
      credentials: "include",
    };

    fetch("http://localhost:3000/users/edit", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        const profileurl = image;
        setImage(profileurl.img_url);
        setdialogs(false);
        console.log("Imagenya: ", image);
        window.location.replace("/profile");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={8}>
            <Card style={{ borderRadius: ".5rem" }}>
              <Card.Body className="row g-0">
                <Col md={4} className="text-center">
                  <img
                    src={
                      // profileImageShow.lenght ? profileImageShow :
                      avatarURL
                    }
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                    }}
                    rounded
                    onClick={() => setdialogs(true)}
                  />

                  {/* <Button
                    className="button-ganti-foto"
                    variant="dark"
                    
                  >
                    Change Picture
                  </Button> */}
                  <Dialog
                    visible={dialogs}
                    header={() => (
                      <p className="button-ganti-foto">Update Avatar</p>
                    )}
                    onHide={() => setdialogs(false)}
                  >
                    <div className="confirmation-content flex flex-column align-items-center">
                      <div className="flex flex-column align-items-center mt-5 w-12">
                        <div className="flex flex-column justify-content-around w-12 mt-4">
                          <div
                            onClick={handleClick}
                            style={{ cursor: "pointer" }}
                          >
                            {image ? (
                              <img
                                src={URL.createObjectURL(image)}
                                alt="upload image"
                                className="img-display-after"
                              />
                            ) : (
                              <img
                                src={pPhoto}
                                alt="upload image"
                                className="img-display-before"
                              />
                            )}

                            <input
                              id="image-upload-input"
                              type="file"
                              onChange={handleImageChange}
                              ref={hiddenFileInput}
                              style={{ display: "none" }}
                            />
                          </div>

                          <Button
                            onClick={handleUploadButtonClick}
                            className="flex justify-content-around w-12 mt-4"
                            label="Save"
                            icon="pi pi-check"
                          />
                        </div>
                      </div>
                    </div>
                  </Dialog>
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
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                              }}
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
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                              }}
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
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="email"
                              placeholder="Enter your name"
                              readOnly
                              style={{
                                border: "none",
                                borderRadius: 0,
                                borderBottom: "1px solid #ced4da",
                              }}
                            />
                          </Col>
                        </Form.Group>
                      </Form>
                    </Row>
                    <Row>
                      <Col md={{ span: 2, offset: 8 }} sm={6}>
                        <Button
                          variant="secondary"
                          style={{ visibility: "hidden" }}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col md={{ span: 2 }} sm={6}>
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
