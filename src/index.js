import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
