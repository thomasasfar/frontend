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
import { async } from "q";

const Riwayat = () => {
  Redirect();

  const [show, setShow] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false); // Add state for the "Add New Form" modal

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [submissions, setSubmissions] = useState([]);
  const [submit, setSubmit] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [form_id, setFormId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/submissions/riwayat", {
        withCredentials: true,
      })
      .then((response) => {
        setSubmissions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:3000/forms/subimit", { withCredentials: true })
  //     .then((response) => {
  //       setSubmit(response.data);
  //       console.log(submit);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const handleModalOpen = (submission) => {
    setSelectedForm(submission);
    setShowModal(true);
  };

  const handleDownload = async () => {
    const nama_file = selectedForm.uploaded_file;
    console.log(nama_file);

    var requestOptions = {
      method: "GET",
      // body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `http://localhost:3000/download/${nama_file}`,
        requestOptions
      );
      alert(response);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "file.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Terjadi kesalahan saat mengunduh file:", error);
    }
  };

  const handleFormCodeSubmit = (e) => {
    e.preventDefault();
    setShow(false); // Hide the form code modal
    setShowModalForm(true); // Show the "Add New Form" modal
  };

  const handleSaveChanges = () => {
    setShowModalForm(false); // Close the "Add New Form" modal
    window.location.replace("/riwayat");
  };

  const handleModalOpen1 = () => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("form_id", form_id);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };

    fetch("http://localhost:3000/forms/submit", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSubmit(data[0]); // Mengatur nilai submit dengan titles
        console.log("data", data[0]);
      })
      .catch((error) => console.log("error", error));
  };

  const handleFileUpload = async (e) => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    // e.preventDefault();
    // alert("Upload");
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // var formdata = new FormData();
    // formdata.append("uploaded_file", selectedFile);
    // // formdata.append("user_id", user_id);
    // formdata.append("form_id", form_id);
    // formdata.append("description", description);

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: "follow",
    // };

    // try { const res = await fetch("http://localhost:3000/submissions", requestOptions);
    //   if (res.statusCode === 200) {
    //     window.location.reload();
    //   }
    //   const result = await res.json();;
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }

    const formData = new FormData();
    // formData.append("user_id", user_id);
    formData.append("form_id", form_id);
    console.log(selectedFile, "test");
    formData.append("uploaded_file", selectedFile);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:3000/submissions",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.statusCode === 200) {
        window.location.replace("/riwayat");
      }
      console.log("File uploaded successfully.");
      // Lakukan aksi lain setelah file diunggah, seperti menyimpan data ke database
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleModalClose = () => {
    setSelectedForm(null);
    setShowModal(false);
    setShowModalForm(false); // Close the "Add New Form" modal
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
            <Form.Group className="mb-3" controlId="form_id">
              <Form.Label>Form Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="id form"
                value={form_id}
                required
                onChange={(e) => setFormId(e.target.value)}
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
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              handleFileUpload();
              handleSaveChanges();
            }}
          >
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
