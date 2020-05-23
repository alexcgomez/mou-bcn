import React, { Component } from "react";
import "./home.scss";
import Navbar from "../../common/navbar/navbar";
import MainContainer from "./main-container/main-container";

export default class Home extends Component {
  render() {
    return (
      <div className="home-background">
        <Navbar></Navbar>
        <MainContainer />
        <p></p>
      </div>
    );
  }
}
