import { combineReducers } from "redux";
import metroLinesReducer from "./metroLinesReducer.js";
import metroStationsReducer from "./metroStationsReducer.js";

export default combineReducers({
  metroLines: metroLinesReducer,
  metroStations: metroStationsReducer,
});
