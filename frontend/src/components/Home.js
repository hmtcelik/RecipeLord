import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button, Container, Row } from "reactstrap";

//react animation
import { useSpring, animated } from 'react-spring'

import RecipeList from "./RecipeList";

const Home = () => {
  const [recipes , setRecipes] = useState([{}]);
  const [ingredients, setIngredients] = useState([{}]);
  const [isPending, setIsPending] = useState(true);
  
  // creating successful message
  const [succesMsg, setSuccesMsg] = useState(false);
  
  // react-strip stuffs
  const springProps = useSpring({ from:{ opacity:0 }, to:{ opacity:1 }, delay: 200, });

  useEffect(() => { /* for first render */
      axios
        .get('/api/recipes')
        .then(res => {
          setIsPending(false);
          setRecipes(res.data);
        })
        .catch(err => console.log(err));
  }, []);

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

  const [pizzas, setPizzas ] = useState([
    {
      name:"peperoni",
      id: 1
    }
  ]);
  
  const [id, setId] = useState(2)

  const reducer = (state, action) => {
    const newPizzas = pizzas.slice();
    switch(action.type){
      case "peperoni":
          newPizzas.push({name:"peperoni", id:(id)})
          setId(id+1);
        return setPizzas(newPizzas);
      case "ananas":
        newPizzas.push({name:"ananas", id:(id)})
        setId(id+1);
        return setPizzas(newPizzas);
      default:
        return state;
    }
  }
  
  const [state, dispatch] = useReducer(reducer, pizzas);
    
  return (
    <Container>
      <div className="home"> {/* for container */}

        {/* Create Button*/}
        <Row style={{displaymarginTop:"20px"}}>
            <Link to="/create"><Button color="succes">New Recipe</Button></Link>
        </Row>

        {pizzas.map(pizza => (
          <div key={pizza.id}>
          {pizza.name}
          </div>
        ))}

        <Button onClick={() => dispatch({ type:"peperoni" })}>add peperoni </Button>
        <Button onClick={() => dispatch({ type:"ananas" })}>add ananas </Button>

        {/* Succes Mesage*/}
        {succesMsg && <Row><p color="green">Succesfully Created</p></Row>}

        <animated.div style={springProps}>
          {/* Recipe List */}
          {isPending && <Row><div className="loader"></div></Row> }
          {!isPending && <RecipeList recipes={recipes} setRecipes={setRecipes}/>}
          {!recipes.length && <Row><p>Wow! Such an empty</p></Row> }
        </animated.div>

      </div>
    </Container>
  );
}
 
export default Home;