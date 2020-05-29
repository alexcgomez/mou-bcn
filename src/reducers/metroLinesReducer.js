import {
  GET_LINES_ATTEMPT,
  GET_LINES_SUCCESS,
  GET_LINES_FAILURE,
} from "../actions/lines/DownloadLinesTypes";

const initialState = {
  loading: false,
  lines: [],
  error: undefined,
};

export default function metroLinesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LINES_ATTEMPT:
      return { ...state, loading: true };
    case GET_LINES_SUCCESS:
      return { ...state, loading: false, lines: action.payload };
    case GET_LINES_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
