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

const Riwayat = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [submissions, setSubmissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/submissions", { withCredentials: true })
      .then((response) => {
        setSubmissions(response.data);
        console.log(submissions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleModalOpen = (submissions) => {
    setSelectedForm(submissions);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedForm(null);
    setShowModal(false);
  };

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
              <th>Instruction</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submissions, index) => (
              <tr key={submissions.submission_id}>
                <td>{index + 1}</td>
                <td>
                  {new Date(submissions.updated_at).toLocaleDateString(
                    "id-ID",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </td>
                <td>{submissions.title}</td>
                <td>{submissions.Instruksi}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleModalOpen(submissions)}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

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

export default Riwayat;
