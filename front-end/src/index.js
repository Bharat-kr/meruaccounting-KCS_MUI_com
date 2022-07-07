// scroll bar
import "simplebar/src/simplebar.css";
import "./index.css";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "notistack";
//
import App from "./App";
import axios from "axios";

// ----------------------------------------------------------------------
// axios.defaults.baseURL = "https://monitoring-meru.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "https://merubackend.live/";
// axios.defaults.baseURL = "http://monitor.meruaccounting.com:8000/";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage["Bearer Token"]}`;

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </SnackbarProvider>,
  document.getElementById("root")
);
