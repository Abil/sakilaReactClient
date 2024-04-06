import { createStore } from "redux";
import rootReducer from "./reducers"; //It will automatically fetch the index file if folder is imported

const store = createStore(rootReducer);

export default store;
