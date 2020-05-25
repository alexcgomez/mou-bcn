import { createStore } from 'redux';
import rootReducer from "../reducers/reducer";

const initialState = {lineas: []};

export const store = createStore(rootReducer,initialState);

window.store = store;