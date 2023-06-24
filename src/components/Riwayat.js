import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import "../styles/FormAsign.css";
import axios from "axios";

const FormAsign = () => {
  const [forms, setForm] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/forms")
      .then((response) => {
        setForm(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(forms);

  const [tampil, setTampil] = useState(false);

  const handleTutup = () => setTampil(false);
  const handleTampil = () => setTampil(true);

  return (
    <div className="warnabackground badan">
      <Container className="mt-5 mb-5 px-5 pt-3 pb-5 warnacont">
        <Row>
          <Col md={3}>
            <h3>Form Assignment</h3>
          </Col>
        </Row>
        <Table striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Heading</th>
              <th>Description</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <tr key={form.form_id}>
                <td>{index + 1}</td>
                <td>{form.updated_at}</td>
                <td>{form.title}</td>
                <td>{form.description}</td>
                <td>
                  <Button variant="primary" onClick={handleTampil}>
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal Detail */}
      <Modal show={tampil} onHide={handleTutup}>
        <Modal.Header closeButton>
          <Modal.Title id="exampleModalToggleLabel">Form xxx</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formId">
              <Form.Label>ID Form</Form.Label>
              <h6>F00xxx</h6>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <h6>Desc xxxxxx</h6>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Uploaded At</Form.Label>
              <h6>xx/xx/xxxx xx:xx</h6>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Download</Form.Label>
              <br />
              <Button variant="success">Close</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            data-bs-target="#exampleModalToggle2"
            data-bs-toggle="modal"
          >
            Submission
          </Button>
          <Button variant="secondary" onClick={handleTutup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormAsign;
