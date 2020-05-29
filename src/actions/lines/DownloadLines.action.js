import axios from "axios";
import {
  GET_LINES_ATTEMPT,
  GET_LINES_SUCCESS,
  GET_LINES_FAILURE,
} from "./DownloadLinesTypes";

const getUserAttempt = () => ({
  type: GET_LINES_ATTEMPT,
});
const getUserSuccess = (payload) => ({
  type: GET_LINES_SUCCESS,
  payload,
});
const getUserFailure = (error) => ({
  type: GET_LINES_FAILURE,
  error,
});

export const downloadLines = () => async (dispatch) => {
  dispatch(getUserAttempt());
  try {
    const response = await axios.get(
      "https://api.tmb.cat/v1/transit/linies/metro?app_id=07ba35b4&app_key=17d5fecb81e92f3daa9e1f5e869db9c2"
    );
    return dispatch(getUserSuccess(response.data));
  } catch (error) {
    return dispatch(getUserFailure(error.message));
  }
};
