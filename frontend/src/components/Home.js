import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button, Container, Row } from "reactstrap";

//react animation
import { useSpring, animated } from 'react-spring'

import RecipeList from "./RecipeList";

const Home = () => {
  const [recipes , setRecipes] = useState([{}]);

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

  return (
    <Container>
      <div className="home"> {/* for container */}

        {/* Create Button*/}
        <Row style={{displaymarginTop:"20px"}}>
            <Link to="/create"><Button color="succes">New Recipe</Button></Link> {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
        </Row>

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