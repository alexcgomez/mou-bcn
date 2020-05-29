import React from "react";
import { Switch, Route } from "react-router-dom";
import Entrypoint from "./modules/entrypoint/entrypoint";
import Home from "./modules/home/home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Entrypoint} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/line/:id" component={LineDetail} />
    </Switch>
  );
};

export default Routes;
