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

const Attendance = () => {
  const [attendances, setAtten] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/forms/attend", { withCredentials: true })
      .then((response) => {
        setAtten(response.data);
        console.log(response.data);
        console.log(attendances);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDownload = async (attendance) => {
    const nama_file = attendance.uploaded_file;
    console.log(nama_file, "nama file");

    try {
      const response = await axios.get(
        `http://localhost:3000/download/${nama_file}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "file.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Terjadi kesalahan saat mengunduh file:", error);
    }
  };

  return (
    <div className="warnabackground badan">
      <Container className="mt-5 mb-5 px-5 pt-3 pb-5 warnacont">
        <Row className="mb-3">
          <Col md={3}>
            <h3>Attendance</h3>
          </Col>
        </Row>
        <Table striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Heading</th>
              <th>Upload By</th>
              <th>Upload Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance, index) => (
              <tr key={attendance.title}>
                <td>{index + 1}</td>
                <td>{attendance.title}</td>
                <td>{attendance.name}</td>
                <td>
                  {new Date(attendance.updated_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleDownload(attendance)}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Attendance;
