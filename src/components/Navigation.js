import React from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.svg";
import axios from "axios";
import { useState, useEffect } from "react";

function Navigation() {
  const [avatarURL, setAvatarURL] = useState(null);

  const requestOptions = {
    method: "GET",
    credentials: "include",
    redirect: "follow",
  };

  useEffect(() => {
    fetch("http://localhost:3000/avatar", requestOptions) // Ganti dengan URL endpoint server yang sesuai
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Terjadi kesalahan saat mengambil avatar");
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setAvatarURL(url);
      })
      .catch((error) => {
        console.error(error);
        setAvatarURL(profile);
      });
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Kirim permintaan logout ke server menggunakan Axios
      await axios.get("http://localhost:3000/auth/logout");

      // Setelah logout berhasil, arahkan pengguna ke halaman login
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
    }
  };

  return (
    <Navbar expand="lg" className="warna-nav" sticky="top">
      <Container className="px-5">
        <Navbar.Brand href="/">Kumpulin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            variant="underline"
            activeKey={location.pathname}
          >
            <Nav.Link href="/" eventKey="/">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/form" eventKey="/form">
              Form Saya
            </Nav.Link>
            <Nav.Link href="attd">Isi Form</Nav.Link>
            <Nav.Link href="riwayat" eventKey="/riwayat">
              Riwayat
            </Nav.Link>
          </Nav>
          <NavDropdown
            title={
              <img
                src={avatarURL}
                alt="Avatar"
                className="mr-2"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
                rounded
                // src={avatarURL}
                // roundedCircle
                // width={30}
                // height={30}
                // borderRadius="50%"
                // className="mr-2"
              />
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/profile">Profil Saya</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout" onClick={handleLogout}>
              Keluar
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
