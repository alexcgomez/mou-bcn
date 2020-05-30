import React from "react";
import { Switch, Route } from "react-router-dom";
import Entrypoint from "./modules/entrypoint/entrypoint";
import Home from "./modules/home/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Entrypoint} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/line/:id" />
    </Switch>
  );
};

export default Routes;
