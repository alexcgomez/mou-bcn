import React, { Component } from "react";
import axios from 'axios';
import "./main-container.scss";

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = "";
  }
  render() {
    return <div className="main-container"></div>;
  }

  async componentDidMount() {
    // const response = await axios.get("http://api.tmb.cat/v1/transit/parades?app_id="+process.env.API_ID
    //   +"&app_key="+process.env.API_KEY_TMB);
    const response = await axios.get("https://api.tmb.cat/v1/transit/parades?app_id=07ba35b4&app_key=17d5fecb81e92f3daa9e1f5e869db9c2");
    console.log(response);
    console.log(process.env)
  }
}
