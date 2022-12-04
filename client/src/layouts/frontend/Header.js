
import React from 'react';
import { Navbar,Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const user = JSON.stringify(localStorage.getItem('auth_name'));
  console.warn(user)
  return (
      <div>
        <Nav class="navbar navbar-dark bg-primary">
          <Navbar.Brand href="#home">User's Table </Navbar.Brand>
            <Nav class="navbar navbar-expand-lg navbar-light bg-light">
               {
                 localStorage.getItem('auth_name') ?
                 <>
                    
                 </>
                 :
                 <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                 </>
               }
            </Nav>
            <Nav>
                <NavDropdown title={user}>
                     <NavDropdown.Item>Logout</NavDropdown.Item>
                     <NavDropdown.Item>Profile</NavDropdown.Item>
                </NavDropdown> 
            </Nav>
        </Nav>
      </div>
    );
}

export default Header;