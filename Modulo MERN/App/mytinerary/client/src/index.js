import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/Mytinerary-styleV2.css";

// Versión 1
// import App from './App';

import AppV2 from "./AppV2.jsx";

import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AppV2 />, document.getElementById("root"));

serviceWorker.unregister();
