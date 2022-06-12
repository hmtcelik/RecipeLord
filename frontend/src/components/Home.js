import React, { useContext, useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button, Container, Row } from "reactstrap";

//react animation
import { useSpring, animated } from 'react-spring'

//my components
import RecipeList from "./RecipeList";

const Home = () => {
  const [recipes , setRecipes] = useState([{}]);
  
  // testing filter
  const [newrecipes , setNewRecipes] = useState([]);
  const [showNewRecipes, setShowNewRecipes] = useState(false);

  // check variable for using 'if' in JSX
  const [isPending, setIsPending] = useState(true);

  // react-spring stuffs
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

  const showMyRecipes = () =>{
    for(let i=0; i<recipes.length; i++){
      if(Number(localStorage.getItem("user_id")) === (recipes[i].owner)){
        newrecipes.push(recipes[i]);
      }
    }
    setShowNewRecipes(true);
  }

  const closeMyRecipes = () =>{
    setNewRecipes([]);
    setShowNewRecipes(false);
  }

  return (
    <Container>
      <div className="home"> {/* for container */}

        {/* Create Button*/}
        <Row style={{displaymarginTop:"20px"}}>
            <Link to="/create"><Button color="success">New Recipe</Button></Link>
        </Row>
        <br></br>
        <Row style={{displaymarginTop:"20px"}}>
            {!showNewRecipes && <Button color="primary" onClick={()=>showMyRecipes()}>Show My Recipes</Button>}
            {showNewRecipes && <Button color="primary" onClick={()=>closeMyRecipes()}>Close My Recipes</Button>}
        </Row>
            {showNewRecipes && <RecipeList recipes={newrecipes} setRecipes={setNewRecipes}/>}

        <animated.div style={springProps}>
          {!showNewRecipes &&
          <div>
            {/* Recipe List */}
            {isPending && <Row><div className="loader"></div></Row> }
            {!isPending && <RecipeList recipes={recipes} setRecipes={setRecipes}/>}
            {!recipes.length && <Row><p>Wow! Such an empty</p></Row> }
          </div>
          }
          </animated.div>

      </div>
    </Container>
  );
}
 
export default Home;