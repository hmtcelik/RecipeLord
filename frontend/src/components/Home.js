import React, { useState } from "react";
import axios from "axios";

import { Button, Container, Row } from "reactstrap";

import RecipeList from "./RecipeList";

const Home = () => {
  const [recipes , setRecipes] = useState([]);

  const refreshList = () => {
    axios
      .get("/api/recipes/")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="Home">
      {refreshList()}
      <Container>
        <Row style={{display:"block", marginTop:"20px"}}>
          <div className="create-btn">
              <Button color="succes" >Create Recipe</Button>
          </div>        
        </Row>
        <Row>
          <RecipeList recipes={recipes} />
        </Row>
      </Container>
    </div>
  );
}
 
export default Home;