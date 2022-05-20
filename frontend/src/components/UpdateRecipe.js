import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

//botstrap elements
import { Container, Button, Row, Form, Input, FormGroup, Label } from "reactstrap";

const UpdateRecipe = () => {
  const id = useParams();
  
  const [recipe, setRecipe] = useState({ id:0, title:"", description:"", created_at:"", });
  
  const [pending, setIsPending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { /* for first render */
    axios
      .get(`/api/recipes/${id.id}`)
      .then(res => {
        setIsPending(false);
        setRecipe(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  
  // on changing
  const handleChange = (e) =>{
      const { name, value } = e.target;
      setRecipe(prevState => ({
        ...prevState,
        [name]: value
      }));
  };

  //on posting
  const handleSubmit = (e) =>{
    axios
    .put(`/api/recipes/${id.id}/`, recipe)
    navigate('/');
  };
  
  return (
  <div>
 <React.Fragment>
        <Container>
          <Row>
            {/*Loader*/}
            {pending && <div className="loader"></div> }

            {/*Form*/}
            {!pending &&         
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Title</Label>
                  <Input type="text" value={recipe.title} name="title" required onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Input type="text" value={recipe.description} name="description" required onChange={handleChange}/>
                </FormGroup>
                <Link to="/"><Button>Cancel</Button></Link> {'\u00A0'}
                <Button type="submit" color="succes">Update</Button>
              </Form>
             }
          </Row>
        </Container>
      </React.Fragment>
  </div>
  );
}
 
export default UpdateRecipe;