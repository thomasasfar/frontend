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
import axios from "axios";

const FormAsign = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [forms, setForms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const [formHeader, setFormHeader] = useState("");
  const [formDescription, setFormDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/forms/formMe", {
          withCredentials: true,
        });
        setForms(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleModalOpen = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedForm(null);
    setShowModal(false);
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    alert("Add");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("description", formDescription);
    urlencoded.append("title", formHeader);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      credentials: "include",
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const res = await fetch("http://localhost:3000/forms", requestOptions);
      if (res.status === 200) {
        window.location.replace("/form");
      }
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="warnabackground badan">
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
            {forms.map((form, index) => (
              <tr key={form.form_id}>
                <td>{index + 1}</td>
                <td>
                  {new Date(form.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{form.title}</td>
                <td>{form.description}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleModalOpen(form)}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Header Form</Form.Label>
              <Form.Control
                type="text"
                placeholder="Form Name"
                value={formHeader}
                onChange={(e) => setFormHeader(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="desc"
                rows={3}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title id="exampleModalToggleLabel">Form Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formId">
              <Form.Label>ID Form</Form.Label>
              <h6>{selectedForm && selectedForm.form_id}</h6>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <h6>{selectedForm && selectedForm.description}</h6>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Uploaded At</Form.Label>
              <h6>
                {selectedForm && (
                  <Form.Group className="mb-3" controlId="formDescription">
                    <h6>
                      {selectedForm &&
                        new Date(selectedForm.updated_at).toLocaleString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )}
                    </h6>
                  </Form.Group>
                )}
              </h6>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormAsign;
