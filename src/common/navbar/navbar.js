import React, { Component } from "react";
import MetroLogo from "../../resources/metro-logo.png";
import "./navbar.scss";
import Button from "../button/Button";

export default class Navbar extends Component {
  render() {
    return (
      <div className="top-navbar">
        <img src={MetroLogo} className="logo-navbar" alt="Metro" />
        <p className="titulo">MouBCN</p>
        <Button text="Inici" link="/home" />
      </div>
    );
  }
}
