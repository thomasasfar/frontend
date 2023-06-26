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
import Redirect from "./Redirect";

const Riwayat = () => {
  const [formName, setFormName] = useState("");
  Redirect();

  const [show, setShow] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false); // Add state for the "Add New Form" modal

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [submissions, setSubmissions] = useState([]);
  const [submit, setSubmit] = useState([]);
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

  useEffect(() => {
    axios
      .post("http://localhost:3000/forms/sumbit", { withCredentials: true })
      .then((response) => {
        setSubmit(response.data);
        console.log(submit);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleModalOpen = (submission) => {
    setSelectedForm(submission);
    setShowModal(true);
  };

  const handleDownload = async () => {
    // Download logic remains the same
  };

  const handleFormCodeSubmit = (e) => {
    e.preventDefault();
    setShow(false); // Hide the form code modal
    setShowModalForm(true); // Show the "Add New Form" modal
  };

  const handleSaveChanges = () => {
    setShowModalForm(false); // Close the "Add New Form" modal
  };

  const handleModalOpen1 = (submit) => {
    alert("pinnya: ", pin.value);
    setSelectedForm(submit);
    setShowModalForm(true);
    setShow(false);
  };

  const handleModalClose = () => {
    setSelectedForm(null);
    setShowModal(false);
    setShowModalForm(false); // Close the "Add New Form" modal
  };

  return (
    <div className="warnabackground badan">
      <Container className="mt-5 mb-5 px-5 pt-3 pb-5 warnacont">
        <Row className="mb-3">
          <Col md={3}>
            <h3>Submissions</h3>
          </Col>
          <Col md={{ offset: 7 }}>
            <Button variant="primary" onClick={handleShow}>
              New Submission
            </Button>
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
            {submissions.map((submission, index) => (
              <tr key={submission.submission_id}>
                <td>{index + 1}</td>
                <td>
                  {new Date(submission.updated_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{submission.title}</td>
                <td>{submission.Instruksi}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleModalOpen(submission)}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Input Kode Form */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Form Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormCodeSubmit}>
            {" "}
            {/* Add onSubmit event to the form */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Form Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Form Name"
                required
                value={this.state.formName}
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={() => handleModalOpen1(submit)}
              type="submit"
            >
              {" "}
              {/* Change the button type to submit */}
              Enter
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Setelah Kode Form Diinputkan */}
      <Modal show={showModalForm} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title id="exampleModalToggleLabel">Form Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formId">
              <Form.Label>Title</Form.Label>
              <h6>{submit && submit.title}</h6>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Instruction</Form.Label>
              <h6>{submit && submit.description}</h6>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Submit File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="desc"
                rows={3}
                value=""
                // onChange={(e) => setFormDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleModalClose}>
            Cancel
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
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Download File</Form.Label>
              <Form.Control
                type="text"
                value={selectedForm && selectedForm.uploaded_file}
                readOnly
              />
              <Button
                variant="primary"
                download={selectedForm && selectedForm.uploaded_file}
                onClick={handleDownload}
              >
                Download
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Riwayat;
