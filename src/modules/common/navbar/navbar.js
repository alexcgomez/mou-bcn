import React, { Component } from "react";
import MetroLogo from "../../../resources/metro-logo.png";
import "./navbar.scss";
import Button from "../button/button";
import ButtonSimple from "../buttonSimple/buttonSimple";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="top-navbar">
        <img src={MetroLogo} className="logo-navbar" alt="Metro" />
        <NavLink
          to="/paradas"
          exact
          style={{ textDecoration: "none", color: "white" }}
        >
          <ButtonSimple text="Parades" />
        </NavLink>
        <NavLink
          to="/retrasos"
          exact
          style={{ textDecoration: "none", color: "white" }}
        >
          <ButtonSimple text="Restrasos" />
        </NavLink>
        <NavLink
          to="/linias"
          exact
          style={{ textDecoration: "none", color: "white" }}
        >
          <ButtonSimple text="Línies" />
        </NavLink>
        <NavLink
          to="/home"
          exact
          style={{ textDecoration: "none", color: "white" }}
        >
          <Button text="Inicio" />
        </NavLink>
      </div>
    );
  }
}
