import React, { Component } from "react";
import "./Home.scss";
import Navbar from "../../common/navbar/navbar";
import MainContainer from "../../common/main-container/main-container";
import { connect } from "react-redux";
import { downloadLines } from "../../actions/lines/DownloadLines.action";
import { downloadStations } from "../../actions/stations/DownloadStations.action";

import { Table } from "react-bootstrap";

class Home extends Component {
  listLines() {
    return this.props.metroLines.lines.features.map((metroline) => {
      return (
        <tr>
          <td>
            <div
              style={{
                backgroundColor: "#" + metroline.properties.COLOR_LINIA,
                fontWeight: "bold",
              }}
            >
              {metroline.properties.NOM_LINIA}
            </div>
          </td>
          <td>{metroline.properties.ORIGEN_LINIA}</td>
          <td>{metroline.properties.DESTI_LINIA}</td>
        </tr>
      );
    });
  }
  render() {
    console.log(this.props.metroStations);

    return (
      <div className="home-background">
        <Navbar />
        <MainContainer>
          <Table responsive hover variant="dark">
            <thead>
              <tr style={{ backgroundColor: "grey", color: "black" }}>
                <th>Línea</th>
                <th>Origen</th>
                <th>Destino</th>
              </tr>
            </thead>
            <tbody>
              {this.props.metroLines.lines.features
                ? this.listLines()
                : "Error obteniendo información"}
            </tbody>
          </Table>
        </MainContainer>
        <MainContainer>
          {this.props.metroLines.stations
            ? this.props.metroLines.stations
            : "Error obteniendo información"}
        </MainContainer>
      </div>
    );
  }

  componentDidMount() {
    this.props.downloadLines();
    this.props.downloadStations();
  }
}

const mapStateToProps = (state) => ({
  metroLines: state.metroLines,
  metroStations: state.metroStations,
});

function mapDispatchToProps(dispatch) {
  return {
    downloadLines: () => dispatch(downloadLines()),
    downloadStations: () => dispatch(downloadStations()),
  };
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHome;
