import React, { Component } from "react";
import MainContainer from "../../common/main-container/main-container";
import { connect } from "react-redux";
class LineDetail extends Component {
  render() {
    return <MainContainer></MainContainer>;
  }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return {};
}

const ConnectedLineDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(LineDetail);
export default ConnectedLineDetail;
