import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

//Note: Store from ReduxToolkit supports thunk functions out of the box
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
