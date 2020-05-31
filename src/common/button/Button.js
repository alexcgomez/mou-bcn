import React, { Component } from "react";
import "./button.scss";
import { NavLink } from "react-router-dom";

export default class Button extends Component {
  render() {
    return (
      <NavLink
        style={{ textDecoration: "none", color: "white" }}
        to={this.props.link}
      >
        <button className="button">{this.props.text}</button>
      </NavLink>
    );
  }
}
