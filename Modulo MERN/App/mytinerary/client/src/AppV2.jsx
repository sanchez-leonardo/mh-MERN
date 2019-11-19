import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { Container, Row } from "reactstrap";

import NavBar from "./components/NavBar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import LandingTabV2 from "./components/LandingTabV2";
import Cities from "./components/Cities";
import Itineraries from "./components/Itineraries";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <Container fluid>
              <Row className="sticky-top">
                <NavBar id="nav-bar" />
              </Row>
              <Row tag="main" className="overflow-auto">
                <Route exact path="/" component={LandingTabV2} />
                <Route path="/cities" component={Cities} />
                <Route path="/log-in" component={LogIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route
                  path="/itineraries/:cityId"
                  component={Itineraries}
                ></Route>
              </Row>
              <Row tag="footer" className="fixed-bottom mh-10">
                <Footer />
              </Row>
            </Container>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
