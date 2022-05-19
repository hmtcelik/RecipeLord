import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

//botstrap elements
import { Container, Button, Row, Form, Input, FormGroup, Label } from "reactstrap";

//set states and functions
import refreshList from "./Home";

const CreateRecipe = () => {
    //for form elements
    const [recipeName, setRecipeName] = useState('');
    const [recipeDesc, setRecipeDesc] = useState('');
    var recipe_id = 0; // inital value

    //for adding ingredients
    const [showAddIngredient, setShowAddIngredient ] = useState(false); //for checking render
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientsList, setIngredientsList] = useState([

    ]);
    const [tempId, setTempId] = useState(2);

    //for returning home page
    const navigate = useNavigate();

    const addIngredient = () => {
      //checking if name is empty
      // I do this because I cant use form inside another form (which of main form)
      if (ingredientName.trim().length === 0) 
        return false;
      const tempIngredients = ingredientsList.slice();
      tempIngredients.push({title:`${ingredientName}`, id:(tempId) });
      setTempId(tempId+1);
      setIngredientsList(tempIngredients);
      setIngredientName('');
    }

    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    
    //submiting form
    const handleSubmit = (e) => {
      e.preventDefault();
      //firstly posting Recipe
      const recipe = { title: recipeName, description: recipeDesc};
      axios
        .post("/api/recipes/", recipe)
        .then((res) => {
          // after creating recipe,  posting ingredients
          recipe_id = (res.data.id); // getting recipe_id from post request response data
          console.log(ingredientsList.length);
          for(let i=0; i<ingredientsList.length;i++){
            const ingredient = { title: ingredientsList[i].title, recipe: recipe_id}          
            axios
              .post("/api/recipeingredients/", ingredient)
              .then((res)=>{
                console.log(res.data);
              });
          }
        });
      navigate('/');
    };

    return (
        <React.Fragment>
        <Container>
          <Row>
            <Form onSubmit={handleSubmit}>
              <h2>Creating Recipe</h2>
              <br />
              <FormGroup>
                <Label>Recipe Title</Label>
                <Input type="text" value={recipeName} required onChange={(e) => setRecipeName(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label>Recipe Description</Label>
                <Input type="text" value={recipeDesc} required onChange={(e) => setRecipeDesc(e.target.value)}/>
              </FormGroup>
              <br />
              <h4>Ingredients</h4>
              {ingredientsList.map(ingredient => (
                <div key={ingredient.id}>
                  <li>{ingredient.title}</li>
                </div>
              ))}
              {!showAddIngredient && <Button onClick={()=> setShowAddIngredient(true)} color="info">Add Ingredient</Button>}
              {showAddIngredient && 
              <div className="addIngredient">
                <br/>
                  <FormGroup>
                    <Label>Ingredient Name</Label>
                    <Input type="text" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)}/>
                  </FormGroup>
                  <Button onClick={addIngredient} color="dark">+</Button>
              </div>
              }
              <br />
              <br />
              <br />
              <Link to="/"><Button>Cancel</Button></Link>  {'\u00A0'}{'\u00A0'}
              <Button type="submit" color="succes">Create</Button>
            </Form>
          </Row>
        </Container>
      </React.Fragment>
    );
}
 
export default CreateRecipe;