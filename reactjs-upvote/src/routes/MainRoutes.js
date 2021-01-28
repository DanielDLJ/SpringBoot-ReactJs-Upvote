import React from 'react';
import Header from "../components/header/Header.js";
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../view/home/Home.js';

function MainRoutes () {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Route path="/" component={Home} />
    </div>
    </BrowserRouter>
  );
};

export default MainRoutes;