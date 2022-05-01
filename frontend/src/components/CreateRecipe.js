import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

//botstrap elements
import { Container, Button, Row, Form, Input, FormGroup, Label } from "reactstrap";

//set states and functions
import refreshList from "./Home";
import setSuccesMsg from "./Home";

const CreateRecipe = () => {
    //for form elements
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //for returning home page
    const navigate = useNavigate();

    //submiting form
    const handleSubmit = (e) => {
      e.preventDefault();
      const recipe = { title: title, description: description};
      axios
        .post("/api/recipes/", recipe)
        .then((res) => refreshList());
      navigate('/');
    };

    return (
        <React.Fragment>
        <Container>
          <Row>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input type="text" value={title} required onChange={(e) => setTitle(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input type="text" value={description} required onChange={(e) => setDescription(e.target.value)}/>
              </FormGroup>
              <Link to="/"><Button>Cancel</Button></Link> {'\u00A0'}{'\u00A0'} 
              <Button type="submit" color="succes">Create</Button>
            </Form>
          </Row>
        </Container>
      </React.Fragment>
    );
}
 
export default CreateRecipe;