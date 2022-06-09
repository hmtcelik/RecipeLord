import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

//bootstrap
import { Container, Row } from "reactstrap";

const SearchResults = () => {
  let search = useParams();
  search = search.item
  
  //states
  const [recipes, setRecipes] = useState([{}]);
  const [oldSearch, setOldSearch] = useState(null);

  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() =>{
    if (oldSearch !== search){
      let searched_item = {"title": search} 
      axios
        .post('/api/search_recipe/', searched_item)
        .then((res)=>{
          if(res.data.results.includes("404")){
            setError(true);
            setErrorMessage("I think, there is no recipe like this")
            setPending(false);
            setOldSearch(null);
          }
          else{
            setRecipes(res.data.results);
            setOldSearch(search);
            setError(false);
            setPending(false);
          }
        })
        .catch((err)=>{
          if(err.message.includes("500")){
            setPending(true);
            // do; after a while, server error message will render 
          }
        })
    }
  },)
  
  return (  
    <>
    <Container>
      <Row>
        <h1>Results:</h1>
      </Row>
 
      {pending && <Row><div className="loader"></div></Row> }

      {error && !pending && <Row><p>{errorMessage}</p></Row>}

      {!error && !pending &&
        <div>
          {recipes.map(recipe => (
            <Row key={recipe.id}>
              <li>{recipe.title}</li>
            </Row>
          ))}
        </div>          
      }
    </Container>
    </>
  );
}
 
export default SearchResults;