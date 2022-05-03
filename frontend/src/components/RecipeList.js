import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
                
                {/* Edit Recipe */}
                <Link to={`/update/${recipe.id}`}><Button>Edit</Button></Link>
              
                {/* Space (&nbsp;) */}
                {'\u00A0'}{'\u00A0'}

                {/* Delete Recipe*/}
                <Button onClick={() => setYouSure(true)} color="danger">Delete</Button>
                {youSure &&
                <div className="sure-box-container">
                  <div className="sure-box-card">
                    <div className="sure-box-context">
                    <span onClick={() => setYouSure(false)} class="sure-box-close">×</span>
                      <div className="sure-box-info">
                        <p>Are you sure about this?</p>
                      </div>
                      <Button onClick={() => handleDelete(recipe.id)} color="danger">Delete</Button>
                    </div>
                  </div>
                </div>
                }
              </div>
            </Row>
          ))}
      </div>
    );
}
 
export default RecipeList;