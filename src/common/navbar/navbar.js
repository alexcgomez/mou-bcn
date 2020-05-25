import React, { Component } from "react";
import MetroLogo from "../../resources/metro-logo.png";
import "./navbar.scss";
import Button from "../button/Button";
import ButtonSimple from "../buttonSimple/buttonSimple";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="top-navbar">
        <img src={MetroLogo} className="logo-navbar" alt="Metro" />
          <Button text="Inicio" />
      </div>
    );
  }
}
