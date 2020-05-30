import {
  GET_STATIONS_ATTEMPT,
  GET_STATIONS_SUCCESS,
  GET_STATIONS_FAILURE,
} from "../actions/stations/DownloadStationsTypes";

const initialState = {
  loading: false,
  stations: [],
  error: undefined,
};

export default function metroStationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATIONS_ATTEMPT:
      return { ...state, loading: true };
    case GET_STATIONS_SUCCESS:
      return { ...state, loading: false, stations: action.payload };
    case GET_STATIONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
