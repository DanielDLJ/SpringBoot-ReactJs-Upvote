import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../view/login/Login.js";
import Register from "../view/register/Register.js";

function LoginRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default LoginRoutes;
