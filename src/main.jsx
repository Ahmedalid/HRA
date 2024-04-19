import React from "react";
import ReactDOM from "react-dom/client";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./index.scss";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
