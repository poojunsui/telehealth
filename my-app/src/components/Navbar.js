// Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';

function NavBar() {
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand className="navbar-brand" >TeleHealth</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="ml-auto">
          <Nav.Link className="nav-link1" disabled>About Us</Nav.Link>
          <Nav.Link className="nav-link2" href="/">Check My Symptoms</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;




