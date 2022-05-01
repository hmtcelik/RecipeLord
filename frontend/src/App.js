import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.js";
import Header from "./components/Header.js";
import CreateRecipe from "./components/CreateRecipe.js";

import './main.scss';


export const App = () => {
  return (
    
    <BrowserRouter>
      <Header />
      <div className="content">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/create' element={<CreateRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
