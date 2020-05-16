import React, { Component } from "react";
import "./buttonSimple.scss";

export default class ButtonSimple extends Component {
  render() {
    return <button className="button-simple">{this.props.text}</button>;
  }
}
