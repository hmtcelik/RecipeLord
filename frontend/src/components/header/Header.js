import React, { useState ,useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Search from "./Search";

const Header = (props) => {
  const navigate = useNavigate();
  
  const [signBtns, setSignBtns] = useState(true);
  
  useEffect(() => {
    if (localStorage.getItem("token")){
      setSignBtns(false)
    }
    else{
      setSignBtns(true);
    }
  },)

  const Logout = () =>{
    axios.post('/api/logout/', null, {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
    .then(res=>{
      localStorage.clear();
      setSignBtns(true);
    });
  };

  return (  
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/"><Navbar.Brand>Recipe Lord</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Top Recipes</Nav.Link>
            <NavDropdown title="Pages" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Search />
          <Nav className="ml-auto">
            {signBtns &&
              <React.Fragment>
                <Nav.Link onClick={()=>navigate('/login')}>Login</Nav.Link>
                <Nav.Link onClick={()=>navigate('/register')}>Register</Nav.Link>
              </React.Fragment>}
            {!signBtns &&
            <React.Fragment>
              <Nav.Link disabled>Hello {localStorage.getItem("username")}</Nav.Link>
              <Nav.Link onClick={()=>Logout()}>Logout</Nav.Link>
            </React.Fragment>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 
export default Header;