import React from "react";

import Home from "./components/Home.js";
import Header from "./components/Header.js";

import './main.scss';


export const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
