import React, { Component } from "react";
import "./DetailContainer.scss";

export default class DetailContainer extends Component {
  constructor() {
    super();
    this.state = "";
  }
  render() {
    return <div className="detail-container">{this.props.children}</div>;
  }
}
