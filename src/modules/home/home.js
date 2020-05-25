import React, { Component } from "react";
import "./home.scss";
import Navbar from "../../common/navbar/navbar";
import MainContainer from "../../common/main-container/main-container";
import axios from "axios";
import { connect } from "react-redux";
import { mostrarLineas } from "../../actions/mostrarLineas";

class Home extends Component {
  render() {
    return (
      <div className="home-background">
        <Navbar/>
        <MainContainer>
          <p></p>
        </MainContainer>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get("https://api.tmb.cat/v1/transit/linies/metro?app_id=07ba35b4&app_key=17d5fecb81e92f3daa9e1f5e869db9c2");
    mostrarLineas(response.data.features);
  }
}

const mapStateToProps = state => ({
 ...state
});
function mapDispatchToProps(dispatch) {
  return { mostrarLineas: linea => dispatch(mostrarLineas(linea)) };
}

const ConnectedHome = connect(mapStateToProps,mapDispatchToProps)(Home);
export default ConnectedHome;