import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

//botstrap elements
import { Container, Button, Row, Form, Input, FormGroup, Label } from "reactstrap";

//set states and functions
import refreshList from "./Home";

const UpdateRecipe = () => {
  const id = useParams();

  return (
  <div>
    <Container>
      <Row>
        {id.id}
      </Row>
    </Container>
  </div>    
  );
}
 
export default UpdateRecipe;