import React from "react";
import Home from "./pages/home/Home"
import { Switch, Route } from "react-router-dom"
import Admin from "./layouts/Admin.js";
import Enseignant from "./layouts/Enseignant"
import StructLogin from "./pages/login/StructLogin.js"
import "./assets/css/material-dashboard-react.css?v=1.10.0";
import ProtectedRoute from './ProtectedRoute'

import "./App.css";

export default function App() {

  return (
    <div>
      <Switch>
        <ProtectedRoute path="/admin" component={Admin} />
        <ProtectedRoute path="/enseignant" component={Enseignant} />
        <Route exact path="/" component={Home} />
        <Route exact path='/login' component={StructLogin} />
      </Switch>
    </div>
  );
};

