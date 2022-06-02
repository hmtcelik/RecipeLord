import { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { Input } from "reactstrap";

import axios from "axios";

const Search = () => {
  const [item, setItem] = useState("");

  const [results, setResults] = useState(false);


  const handleSearch = (e) =>{
    e.preventDefault();
    axios
    .get(`/api/recipes/${item}`)
    .then(res=>{
      console.log(res.data)
      setResults(true)
    });
  }

  return (
    <>
      {results &&
        <p>Searching...</p>
      }

      {!results &&
        <Form onSubmit={handleSearch} className="d-flex">
          <Input
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            required
            onChange={(e) => setItem(e.target.value)}
          />
          <Button type="submit" variant="outline-success" >Search</Button>
        </Form>
      }
    </>
  );
}
 
export default Search;