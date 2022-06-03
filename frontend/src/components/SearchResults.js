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
  const [errorMessage, setErrorMessage] = useState(true);
  const [pending, setPending] = useState(true);

  useEffect(() => { /* for first render */
    axios
    .get(`/api/recipes/${id.id}`)
    .then(res=>{
      setRecipe(res.data)
      setError(false);
      setPending(false);
    })
    .catch(e=>{
      console.log(e)
      if(e.message.includes("404")){
        setError(true);
        setPending(false);
        setErrorMessage("This recipe is not exist");
      }
      else if(e.message.includes("500")){
        setError(false);
        setPending(true);
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
        {pending && <Row><div className="loader"></div></Row> }

        {error && !pending &&
          <p>{errorMessage}</p>
        }
        {!error && !pending &&
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