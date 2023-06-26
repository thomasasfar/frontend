import React, { useState, useEffect } from "react";
import { Col, Row, Container, Table, Forms, Button } from "react-bootstrap";
import "../styles/Dash.css";
import axios from "axios";

const Dash = () => {
  // const [visibleRows, setVisibleRows] = useState(3);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    getForms();
  }, []); 
  
  const getForms = async () => {
    const response = await axios.get(
      `http://localhost:3000/forms/formMe`
    );
    
    setForms(response.data.result);
  }
  
  const slicedForms = forms.slice(0, 4);

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions();
  }, []); 
  
  const getSubmissions = async () => {
    const response = await axios.get(
      `http://localhost:3000/submissions/riwayatPage`
    );
    setSubmissions(response.data.result);
  }
  
  const slicedSubmissions = submissions.slice(0, 4);

  return (
    <div className="badan-dash">
      <Container className="mt-5 mb-5 px-5 pb-5">
        <Row className="mb-3">
          <i className="judul-dash">WELCOME TO KUMPULIN</i>
          <i className="parag-judul">Build and Submit with Kumpulin</i>
        </Row>
        <Row>
          <Col sm={6}>
            <Container className="kolom border py-2 px-5">
              <Row>
                  <i className="judul-sub">My Own Form</i>
                  <Table striped hover>
                    <thead className="table-warning">
                      <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Heading</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-table">
                      {slicedForms.map((form, index) => (
                        <tr key={form.form_id}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(form.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>{form.title}</td>
                         </tr>
                       ))}
                    </tbody>
                  </Table>
              </Row>
            </Container>
          </Col>
          <Col sm={6}>
          <Container className="kolom border py-2 px-5">
              <Row>
                  <i className="judul-sub">My Submission</i>
                  <Table striped hover>
                    <thead className="table-warning">
                      <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Heading</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-table">
                      {slicedSubmissions.map((submission, index) => (
                        <tr key={submission.user_id + submission.form_id}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(submission.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>{submission.title}</td>
                         </tr>
                       ))}
                    </tbody>
                  </Table>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dash;
