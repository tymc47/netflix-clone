import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import { HashRouter as Router } from "react-router-dom";
import { StateProvider, reducer } from "./state";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

document.body.style.background = "#141414";

root.render(
  <Router>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </Router>
);
