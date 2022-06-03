import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

//botstrap elements
import { Container, Button, Row, Form, Input, FormGroup, Label } from "reactstrap";

const CreateRecipe = () => {  
    const navigate = useNavigate();
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(()=>{
      if (localStorage.getItem("token")){
        setLoginCheck(true);
      }
      else
        navigate('/login');
    },[])

    //for form elements
    const [recipeName, setRecipeName] = useState('');
    const [recipeDesc, setRecipeDesc] = useState('');
    var recipe_id = 0; // inital value

    //for adding ingredients
    const [showAddIngredient, setShowAddIngredient ] = useState(false); //for checking render
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    
    const [tempId, setTempId] = useState(1); //for creating ingredient on JUST DOM !!

    //submiting form
    const handleSubmit = (e) => {
      e.preventDefault();
      //firstly posting Recipe
      const recipe = { title: recipeName, description: recipeDesc, owner: localStorage.getItem("user_id")};
      axios
      .post("/api/recipes/", recipe)
        .then((res) => {
          // after creating recipe,  posting ingredients
          recipe_id = (res.data.id); // getting recipe_id from post request response data
          if (ingredientsList.length >= 1)
          ingredientCreation();
          else{
            return (navigate('/'));
          }  
        });
      };
      
    // on db
    let i = 0;
    const ingredientCreation = () =>{
      const ingredient = { title: ingredientsList[i].title, recipe: recipe_id}          
      axios
      .post("/api/recipeingredients/", ingredient)
      .then((res)=>{
            i++;
            if (ingredientsList.length === i){
              return (navigate('/'));
            }
            else{
              ingredientCreation();
            }
          });
        }
        
    //on DOM
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

    //on DOM
    const deleteIngredient = (id) =>{
      const newIngredients = ingredientsList.filter(ingredient => ingredient.id !== id);
      setIngredientsList(newIngredients);
    }

    return (
      <>
      {loginCheck &&
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

              {/* displaying ingredients */}
              <br />
              <h4>Ingredients</h4>
              {ingredientsList.map(ingredient => (
                <div key={ingredient.id}>
                  <li style={{display:"inline-block", marginRight:"10px"}} >{ingredient.title}</li> 
                  <Button type="button" onClick={()=>{deleteIngredient(ingredient.id);}} color="danger" style={{display:"inline-block"}}>x</Button>
                </div>
              ))}

              {/* adding ingredients */}
              {!showAddIngredient && <Button onClick={()=> setShowAddIngredient(true)} color="info">+</Button>}
              {showAddIngredient && 
              <div className="addIngredient">
                <br/>
                  <FormGroup style={{display:"inline-block",marginRight:"10px"}}>
                    <Input type="text" value={ingredientName} placeholder="(example: 3 egg) " onChange={(e) => setIngredientName(e.target.value)}/>
                  </FormGroup>
                    <Button type="button" onClick={addIngredient} color="dark" style={{display:"inline-block"}}>+</Button>
                    <br />
                    <Button type="button" onClick={()=>{setShowAddIngredient(false); setIngredientName("");}} color="info" >Close</Button>
              </div>
              }
              <br />
              <br />
              <br />
              <Link to="/"><Button>Cancel</Button></Link>  {'\u00A0'}
              <Button type="submit" color="success">Create</Button>
            </Form>
          </Row>
        </Container>
      </React.Fragment>
      }
      </>
    );
}
 
export default CreateRecipe;