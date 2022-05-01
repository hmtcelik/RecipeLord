import axios from "axios";
import React, { useState } from "react";

import { Button, Row } from "reactstrap";

//states and functions
import refreshList from "./Home";

const RecipeList = (props) => {
    const recipes = props.recipes;
    const setRecipes = props.setRecipes;
    // r you sure? on delete
    const [youSure, setYouSure] = useState(false);
    
    const handleDelete = (id) => {
      //deleting DOM
      const newRecipes = recipes.filter(recipe => recipe.id !== id);
      setRecipes(newRecipes);

      //delete request with API
      axios
        .delete(`/api/recipes/${id}`)
        .then((res) => refreshList());
    }

    return (  
      <div className="recipe-list">
          {recipes.map(recipe => (
            <Row key={recipe.id}>
              <div className="recipe-wrapper">
                <div className="recipe-title">
                { recipe.title }
                </div>
                <div className="recipe-description">
                  { recipe.description }
                </div>
                

                {/* Delete Recipe*/}
                {!youSure && <Button onClick={() => setYouSure(true)} color="danger">Delete</Button>}
                {youSure &&  <Button onClick={() => handleDelete(recipe.id)} color="dark">You Sure?</Button>}  

              </div>
            </Row>
          ))}
      </div>
    );
}
 
export default RecipeList;