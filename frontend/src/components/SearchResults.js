import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

//bootstrap
import { Container, Row } from "reactstrap";

const SearchResults = () => {
  const id = useParams();
  
  //states
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(true);

  useEffect(() => { /* for first render */
    axios
    .get(`/api/recipes/${id.id}`)
    .then(res=>{
      setRecipe(res.data)
      setError(false);
    })
    .catch(e=>{
      console.log(e)
      if(e){
        setError(true);
      }
    });
  },)
  
  return (  
    <>
    <Container>
      <Row>
        <h1>Results:</h1>
      </Row>
      <Row>
        {error &&
          <p>this recipe is not exist</p>
        }
        {!error &&
          <div>
            <h4>{recipe.title}</h4>
            <p>{recipe.description}</p>
          </div>
        }
      </Row>
    </Container>

    </>
  );
}
 
export default SearchResults;