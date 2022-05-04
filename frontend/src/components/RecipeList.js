import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Row } from "reactstrap";

//states and functions
import refreshList from "./Home";

const RecipeList = (props) => {
    const recipes = props.recipes;
    const setRecipes = props.setRecipes;
    
    // for finding id on deleting
    const refDelete = React.createRef();

    // r you sure? on delete
    const [youSure, setYouSure] = useState(false);

    const handleDelete = (id) => {
      console.log(id);
      setYouSure(false);
      //deleting DOM
      // const newRecipes = recipes.filter(recipe => recipe.id !== id);
      // setRecipes(newRecipes);

      // //delete request with API
      // axios
      //   .delete(`/api/recipes/${id}`)
      //   .then((res) => refreshList());
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

                  {/* Edit Recipe */}
                  <Link to={`/update/${recipe.id}`}><Button>Edit</Button></Link>
                
                  {/* Space (&nbsp;) */}
                  {'\u00A0'}{'\u00A0'}

                  {/* Delete Recipe*/}
                  <Button ref={refDelete} value={recipe.id} onClick={() => setYouSure(true)} color="danger">Delete</Button>
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
                      <Button onClick={() => handleDelete(refDelete.current)} color="danger">Delete</Button>
                    </div>
                  </div>
                </div>
                }

      </div>
    );
}
 
export default RecipeList;