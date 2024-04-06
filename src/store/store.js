import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; //Thunk

import rootReducer from "./reducers"; //It will automatically fetch the index file if folder is imported

//const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk)); //Thunk

export default store;
