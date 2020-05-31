import React, { Component } from "react";
import "./main-container.scss";
import Navbar from "../../common/navbar/navbar";

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = "";
  }
  render() {
    return (
      <div className="container-background">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
