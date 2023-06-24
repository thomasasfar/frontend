import React from "react";
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
import { useState } from "react";

const FormAsign = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tampil, setTampil] = useState(false);

  const handleTutup = () => setTampil(false);
  const handleTampil = () => setTampil(true);

  return (
    <div className="warnabackground badan mt-5">
      <Container className="mt-5 mb-5 px-5 pt-3 pb-5 warnacont">
        <Row>
          <Col md={3}>
            <h3>Form Assignment</h3>
          </Col>
          <Col md={{ span: 2, offset: 7 }}>
            <Button variant="primary" onClick={handleShow}>
              Add
            </Button>
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
            <tr>
              <td>xx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>
                <Button variant="primary" onClick={handleTampil}>
                  Detail
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      {/* Modal Add */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Header Form</Form.Label>
              <Form.Control type="text" placeholder="Form Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="desc"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Add File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
