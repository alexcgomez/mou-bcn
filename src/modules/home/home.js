import React, { Component } from "react";
import "./home.scss";
import Navbar from "../common/navbar/navbar";

export default class Home extends Component {
  render() {
    return (
      <div className="home-background">
        <Navbar></Navbar>
      </div>
    );
  }
}
