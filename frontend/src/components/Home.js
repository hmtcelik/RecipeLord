import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button, Container, Row } from "reactstrap";

import RecipeList from "./RecipeList";

const Home = () => {
  const [recipes , setRecipes] = useState([{}]);
  const [isPending, setIsPending] = useState(true);
  
  // creating successful message
  const [succesMsg, setSuccesMsg] = useState(false);

  useEffect(() => { /* for first render */
      axios
        .get('/api/recipes')
        .then(res => {
          setIsPending(false);
          setRecipes(res.data);
        })
        .catch(err => console.log(err));
  }, [])

  const refreshList = () =>{ /* other get requests */
    setIsPending(true)
    axios
    .get('/api/recipes')
    .then(res => {
      setIsPending(false);
      setRecipes(res.data);
    })
    .catch(err => console.log(err));
  };

  return (
      <Container>

        {/* Create Button*/}
        <Row style={{display:"block", marginTop:"20px"}}>
            <Link to="/create"><Button color="succes">New Recipe</Button></Link>
        </Row>

        {/* Succes Mesage*/}
        {succesMsg && <Row><p color="green">Succesfully Created</p></Row>}

        {/* Recipe List */}
        {isPending && <Row><p style={{marginTop:"20px"}}>Loading...</p></Row> }
        {!isPending && <RecipeList recipes={recipes} setRecipes={setRecipes}/>}

      </Container>
  );
}
 
export default Home;