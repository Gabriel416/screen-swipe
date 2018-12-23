import React from "react";
import Home from "../views/Home";
import { Route, Switch } from "react-router-dom";

export const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  </div>
);

export default Routes;
