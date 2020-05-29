import { combineReducers } from "redux";
import metroLinesReducer from "./metroLinesReducer.js";

export default combineReducers({
  metroLines: metroLinesReducer,
});
