import React, { Component } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import LandingTab from "./components/LandingTab";
import Cities from "./components/Cities";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";

import "./styles/Mytinerary-style.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" component={LandingTab} />
          <Route path="/cities" component={Cities} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
