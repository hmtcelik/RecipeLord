import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { Container, Button, Row, Form, Input, FormGroup, Label } from "reactstrap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //for returning home page
  const navigate = useNavigate(); 
  
  //errors
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
      const user = { username: username, password:password}
      axios
      .post("/api/login/", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("token",(res.data.token))
      })
      .catch((e) => console.log(e));
      
      navigate('/');
  }
  
  return (  
    <>
    <React.Fragment>
        <Container>
          <Row>
          <Form onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <br />
              <FormGroup>
                <Label>Username</Label>
                <Input type="text" value={username} required onChange={(e) => setUsername(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label>Passoword</Label>
                <Input type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              </FormGroup>  

              {incorrectPassword && <p style={{color:"tomato"}}>your passowords not match</p>}
              
              <Link to={"/"}><Button color="secondary">Cancel</Button></Link> {'\u00A0'}
              <Button type="submit" color="succes">Sign In</Button>
          
          </Form>
          </Row>
        </Container>
    </React.Fragment>
    </>
  );
};
 
export default Register;