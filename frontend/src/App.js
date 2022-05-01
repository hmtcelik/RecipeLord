import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.js";
import Header from "./components/Header.js";
import CreateRecipe from "./components/CreateRecipe.js";
import UpdateRecipe from "./components/UpdateRecipe";

import './main.scss';


export const App = () => {
  return (
    
    <BrowserRouter>
      <Header />
      <div className="content">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/create' element={<CreateRecipe />} />
          <Route exact path='/update/:id' element={<UpdateRecipe />} />          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
