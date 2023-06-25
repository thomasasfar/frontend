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
import ReactPaginate from "react-paginate";
import "bulma/css/bulma.css";
import "../styles/FormAsign.css";

const FormAsign = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [forms, setForms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const [formHeader, setFormHeader] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // pagination
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getForms();
  }, [page, keyword]);

  const getForms = async () => {
    const response = await axios.get(
      `http://localhost:3000/forms/formMe?page=${page}&limit=${limit}`
      // `http://localhost:3000/forms`
    );
    setForms(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    console.log(response.data.result);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeyword(query);
  };

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

  const handleDeleteForm = async (form) => {
    const formId = form.form_id;
    try {
      const response = await axios.post(
        `http://localhost:3000/forms/${formId}/delete`,
        {
          withCredentials: true,
        },
        console.log(formId)
      );
      if (response.status === 200) {
        // Menghapus form dari daftar setelah berhasil dihapus
        setForms(forms.filter((form) => form.form_id !== formId));
        console.log("Form berhasil dihapus!");
      } else {
        console.log("Gagal menghapus form");
      }
    } catch (error) {
      console.log("Terjadi kesalahan saat menghapus form:", error);
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
          <tbody className="font-body-table">
            {forms.map((form, index) => {
              const currentNumber = page * limit + index + 1;
              return (
                <tr key={form.form_id}>
                  <td width="6%">{currentNumber}</td>
                  <td width="15%">
                    {new Date(form.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td width="24%">{form.title}</td>
                  <td width="40%">{form.description}</td>
                  <td width="15%">
                    <Button
                      variant="primary"
                      onClick={() => handleModalOpen(form)}
                    >
                      Detail
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteForm(form)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <p>
          Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>
        <p className="has-text-centered has-text-danger">{msg}</p>
        <nav
          className="pagination is-centered"
          key={rows}
          role="navigation"
          aria-label="pagination"
        >
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={Math.min(10, pages)}
            onPageChange={changePage}
            containerClassName={"pagination-list"}
            pageLinkClassName={"pagination-link"}
            previousLinkClassName={"pagination-previous"}
            nextLinkClassName={"pagination-next"}
            activeLinkClassName={"pagination-link is-current"}
            disabledLinkClassName={"pagination-link is-disabled"}
          />
        </nav>
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
          <Button variant="success" onClick={handleAddForm}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
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

export default FormAsign;
