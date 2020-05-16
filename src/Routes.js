import React from "react";
import { Switch, Route } from "react-router-dom";
import Entrypoint from "./modules/entrypoint/entrypoint";
import About from "./modules/about/about";
import Lineas from "./modules/lineas/lineas";
import Paradas from "./modules/paradas/paradas";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Entrypoint} />
      <Route exact path="/about" component={About} />
      <Route exact path="/lineas" component={Lineas} />
      <Route exact path="/paradas" component={Paradas} />
    </Switch>
  );
};

export default Routes;
