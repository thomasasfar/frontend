import { Container, Nav, Navbar, NavDropdown, Image }from "react-bootstrap";
import "../styles/Navigation.css";
import profile from "../assets/images/profile.svg";

function Navigation() {
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
          >
            <Nav.Link href="#action1">Dashboard</Nav.Link>
            <Nav.Link href="form">Form Saya</Nav.Link>
            <Nav.Link href="action3">Isi Form</Nav.Link>
            <Nav.Link href="riwayat">Riwayat</Nav.Link>
          </Nav>
          <NavDropdown title={
              <Image src={profile} roundedCircle width={30} height={30} className="mr-2" />} id="basic-nav-dropdown">
            <NavDropdown.Item href="#profile">
              Profil Saya
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Keluar</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;