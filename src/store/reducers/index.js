import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import countryReducer from "./countryReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  countryReducer,
});

export default rootReducer;
