import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/auth";

//Redux Provider and the Store
import { Provider } from "react-redux";
import store from "./store/store.js";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/*Redux Provider*/}
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
