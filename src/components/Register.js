import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();

  const Register = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("confPassword", confPassword);
    urlencoded.append("email", email);
    urlencoded.append("name", name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:3000/auth/register", requestOptions)
      .then(function (res) {
        if (res.status === 200) {
          window.location.replace("login");
        }
        return res.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // try {
    //   await axios.post("http://localhost:3000/auth/register", {
    //     name: name,
    //     email: email,
    //     username: username,
    //     password: password,
    //     confPassword: confPassword,
    //   });
    //   history.push("/");
    // } catch (error) {
    //   if (error.response) {
    //     setMsg(error.response.data.msg);
    //   }
    // }
  };

  return (
    <div>
      <Container fluid className="h-custom">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col
            md={8}
            lg={6}
            xl={4}
            offset={{ xl: 0 }}
            className="mt-1 px-3 py-1"
          >
            <Form id="register" onSubmit={Register}>
              <div className="card-body p-3 text-center">
                <i className="judul">Register to Kumpulin</i>
              </div>

              {/* Kasih kolom */}
              <Container className="kolom pt-3 px-4">
                <p className="text-center">{msg}</p>
                {/* Nama input */}
                <Form.Group className="form-outline mb-3 " controlId="nama">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                {/* Email input */}
                <Form.Group className="form-outline mb-3 " controlId="nama">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                {/* Username input */}
                <Form.Group className="form-outline mb-3 " controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Create a username"
                    size="lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                {/* Password input */}
                <Form.Group className="form-outline mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/*Confirm Password input */}
                <Form.Group className="form-outline mb-3" controlId="password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password again"
                    size="lg"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="text-center text-lg-start">
                  <div className="card-body py-3 text-center">
                    <Button type="submit" variant="primary" size="lg">
                      Register
                    </Button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have account?
                      <a href="login" className="link-danger">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
