import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { Container, Button, Row, Form, Input, FormGroup, Label } from "reactstrap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  //for returning home page
  const navigate = useNavigate(); 
  
  //errors
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);


  
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(password1);
    console.log(password2);
    if (password1 === password2){
      const user = { username: username, email: email, password:password1}
      axios
      .post("/api/user/", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
      
      navigate('/');
    }
    else{
      setPasswordsNotMatch(true)
    }
  };
  

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
                <Label>Email</Label>
                <Input type="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label>Passoword</Label>
                <Input type="password" value={password1} required onChange={(e) => setPassword1(e.target.value)}/>
              </FormGroup>  
              <FormGroup>
                <Label>Passoword Again</Label>
                <Input type="password" value={password2} required onChange={(e) => setPassword2(e.target.value)}/>
              </FormGroup>
              {passwordsNotMatch && <p style={{color:"tomato"}}>your passowords not match</p>}
              <Link to={"/"}><Button color="secondary">Cancel</Button></Link> {'\u00A0'}
              <Button type="submit" color="succes">Sign Up</Button>
          </Form>
          </Row>
        </Container>
    </React.Fragment>
    </>
  );
}
 
export default Register;