import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./components/Home.js";
import CreateRecipe from "./components/CreateRecipe.js";
import UpdateRecipe from "./components/UpdateRecipe";
import Register from "./components/authentication/Register.js";
import Login from "./components/authentication/Login.js";
import SearchResults from "./components/SearchResults.js";

const Router = () => {
  return (  
    <>
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/create' element={<CreateRecipe />} />
          <Route exact path='/update/:id' element={<UpdateRecipe />} />
          <Route exact path='/results/:id' element={<SearchResults />} />               
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}
 
export default Router;