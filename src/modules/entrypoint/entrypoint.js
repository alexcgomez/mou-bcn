import React from "react";
import "./entrypoint.scss";
import MetroLogo from "../../resources/metro-logo.png";
import { NavLink } from "react-router-dom";

class Entrypoint extends React.Component {
  render() {
    return (
      <div className="background">
        <div>
          <img src={MetroLogo} className="logo-entrypoint" alt="Metro"></img>
          <NavLink
            to="/home"
            exact
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="principalButton">
              <h1 name="name">MouBCN</h1>
            </div>
          </NavLink>
          <h4>Metro a Barcelona</h4>
          <p>Fes click a MouBCN per entrar</p>
        </div>
      </div>
    );
  }
}

export default Entrypoint;
