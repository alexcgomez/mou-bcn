import React, { Component } from "react";
import MainContainer from "../../common/main-container/main-container";
import DetailContainer from "../../common/detail-container/DetailContainer";
import { connect } from "react-redux";
import { downloadStations } from "../../actions/stations/DownloadStations.action";
import { Table } from "react-bootstrap";

class LineDetail extends Component {
  render() {
    console.log(this.props.metroStations.stations);

    return (
      <MainContainer>
        <DetailContainer>
          <Table responsive hover variant="dark">
            <thead>
              <tr style={{ backgroundColor: "grey", color: "black" }}>
                <th>Estació</th>
                <th>Origen</th>
                <th>Destí</th>
                <th>Estat</th>
              </tr>
            </thead>
            <tbody>{this.listStations()}</tbody>
          </Table>
        </DetailContainer>
      </MainContainer>
    );
  }
  listStations() {
    return this.props.metroStations.stations.map((metroStation) => {
      return (
        <tr key={metroStation.id}>
          <td>
            <div>{metroStation.properties.NOM_ESTACIO}</div>
          </td>
          <td>{metroStation.properties.ORIGEN_SERVEI}</td>
          <td>{metroStation.properties.DESTI_SERVEI}</td>
          <td>{metroStation.properties.NOM_TIPUS_ESTAT}</td>
        </tr>
      );
    });
  }
  componentDidMount() {
    this.props.downloadStations(this.props.match.params.id);
  }
}

const mapStateToProps = (state) => ({
  metroStations: state.metroStations,
});

function mapDispatchToProps(dispatch) {
  return {
    downloadStations: (id) => dispatch(downloadStations(id)),
  };
}

const ConnectedLineDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(LineDetail);
export default ConnectedLineDetail;
