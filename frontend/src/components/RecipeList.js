import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Row } from "reactstrap";

import Ingredients from "./IngredientsList";

const RecipeList = (props) => {
    const recipes = props.recipes;
    const setRecipes = props.setRecipes;
    
    // for finding id on deleting
    const [recipeid, setRecipeId] = useState(0);

    // r you sure? on delete
    const [youSure, setYouSure] = useState(false);

    const handleDelete = (id) => {
      setYouSure(false);
      
      //deleting on DOM
      const newRecipes = recipes.filter(recipe => recipe.id !== id);
      setRecipes(newRecipes);

      //delete request with API
      axios
        .delete(`/api/recipes/${id}`);
    }

    return (  
      <div className="recipe-list">
          {recipes.map(recipe => (
            <Row key={recipe.id}>
              <div className="recipe">
                <div className="recipe wrapper">
                  <div className="recipe title">
                    { recipe.title }
                  </div>
                  <div className="recipe description">
                    { recipe.description }
                  </div>

                  <br />
                  <h5>ingredissents</h5>
                  <Ingredients recipeId={recipe.id}/>
                        
                  {/* Edit Recipe */}
                  <Link to={`/update/${recipe.id}`}><Button>Edit</Button></Link>
                
                  {/* Space (&nbsp;) */}
                  {'\u00A0'}{'\u00A0'}

                  {/* Delete Recipe*/}
                  <Button onClick={() => {setYouSure(true); setRecipeId(recipe.id);}} color="danger">Delete</Button>
                </div>
              </div>
            </Row>
          ))}
                {youSure &&
                <div className="sure-box-container">
                  <div className="sure-box-card">
                    <div className="sure-box-context">
                    <span onClick={() => setYouSure(false)} className="sure-box-close">×</span>
                      <div className="sure-box-info">
                        <p>Are you sure about this?</p>
                      </div>
                      <Button onClick={() => handleDelete(recipeid)} color="danger">Delete</Button>
                    </div>
                  </div>
                </div>
                }
      </div>
    );
}

export default RecipeList;