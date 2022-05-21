import React, { useEffect, useState } from "react";
import axios from "axios";


const Ingredients = (props) =>{
  const [ingredients, setIngredients] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { /* for first render */
  axios
    .get('/api/recipeingredients/')
    .then(res=>{
      const filteredIngredients = res.data.filter(ingredient => ingredient.recipe === props.recipeId);
      setIngredients(filteredIngredients);
      setLoading(false);
    })
    .catch(err => console.log(err));
  },[]);

  return(
    <>
      {!loading &&
      <div className="ingredients">
        {ingredients.map(ingredient => (
          <div key={ingredient.id}>
            <li>{ingredient.title}</li>
          </div>
        ))}
      </div>
      }
    </>
  );
};
 
export default Ingredients;