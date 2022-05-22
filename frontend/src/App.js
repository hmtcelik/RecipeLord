import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.js";
import Header from "./components/Header.js";
import CreateRecipe from "./components/CreateRecipe.js";
import UpdateRecipe from "./components/UpdateRecipe";
import Register from "./components/authentication/Register.js";
import Login from "./components/authentication/Login.js";

import './main.scss';


export const App = () => {
  return (
    
    <BrowserRouter>
      <Header />
      <div className="content">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/create' element={<CreateRecipe />} />
          <Route exact path='/update/:id' element={<UpdateRecipe />} />          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
