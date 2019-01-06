import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../views/Home";
import Result from "../views/Result";

export const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/result" component={Result} />
      <Route component={Home} />
    </Switch>
  </div>
);

export default Routes;
