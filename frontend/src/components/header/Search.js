import { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { Input } from "reactstrap";

import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [item, setItem] = useState("");
  
  const navigate = useNavigate();
  
  const handleSearch = (e) =>{
    e.preventDefault();
    console.log(`/results/${item}`);
    navigate(`/results/${item}`);
  }

  return (
    <>
      <Form onSubmit={handleSearch} className="d-flex">
        <Input
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          required
          onChange={(e) => setItem(e.target.value)}
        />
        <Button type="submit" variant="outline-success">Search</Button>
      </Form>
    </>
  );
}
 
export default Search;