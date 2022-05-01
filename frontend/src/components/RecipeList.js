import axios from "axios";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { Button, Row } from "reactstrap";

//states and functions
import refreshList from "./Home";

const RecipeList = (props) => {
    const recipes = props.recipes;
    const setRecipes = props.setRecipes;

    const navigate = useNavigate();

    const handleDelete = (id) => {
      //deleting DOM
      const newRecipes = recipes.filter(recipe => recipe.id !== id);
      setRecipes(newRecipes);

      //delete request with API
      axios
        .delete(`/api/recipes/${id}`)
        .then((res) => refreshList());
      navigate('/');
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
              <Button onClick={() => handleDelete(recipe.id)} color="danger">Delete</Button>  
            </div>
          </Row>
        ))}
      </div>
    );
}
 
export default RecipeList;