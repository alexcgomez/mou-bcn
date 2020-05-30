import React, { Component } from "react";
import "./Home.scss";
import Navbar from "../../common/navbar/navbar";
import MainContainer from "../../common/main-container/main-container";
import { connect } from "react-redux";
import { downloadLines } from "../../actions/lines/DownloadLines.action";

class Home extends Component {
  render() {
    console.log(this.props.metroLines);
    return (
      <div className="home-background">
        <Navbar />
        <MainContainer>
          <p></p>
        </MainContainer>
      </div>
    );
  }

  componentDidMount() {
    this.props.downloadLines();
  }
}

const mapStateToProps = (state) => ({
  metroLines: state.metroLines,
});

function mapDispatchToProps(dispatch) {
  return {
    downloadLines: () => dispatch(downloadLines()),
  };
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHome;
