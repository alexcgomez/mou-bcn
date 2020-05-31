import React, { Component } from "react";
import "./Home.scss";
import MainContainer from "../../common/main-container/main-container";
import { connect } from "react-redux";
import { downloadLines } from "../../actions/lines/DownloadLines.action";
import { downloadStations } from "../../actions/stations/DownloadStations.action";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DetailContainer from "../../common/detail-container/DetailContainer";
import Icon from "@material-ui/core/Icon";

class Home extends Component {
  render() {
    return (
      <MainContainer>
        <DetailContainer>
          <Table responsive hover variant="dark">
            <thead>
              <tr style={{ backgroundColor: "grey", color: "black" }}>
                <th>Línia</th>
                <th>Origen</th>
                <th>Destí</th>
                <th>Veure linia</th>
              </tr>
            </thead>
            <tbody>{this.listLines()}</tbody>
          </Table>
        </DetailContainer>
      </MainContainer>
    );
  }

  componentDidMount() {
    this.props.downloadLines();
  }

  listLines() {
    return this.props.metroLines.lines.map((metroline) => {
      return (
        <tr key={metroline.id}>
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
          <td>
            <NavLink
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
              to={"line/" + metroline.properties.CODI_LINIA}
            >
              <Icon className="fas fa-subway" style={{ color: "green" }} />
            </NavLink>
          </td>
        </tr>
      );
    });
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
