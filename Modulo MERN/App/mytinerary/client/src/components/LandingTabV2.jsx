import React from "react";
import { NavLink } from "react-router-dom";

import { Row, Col } from "reactstrap";

import CitiesCarousel from "./CitiesCarousel";

import Arrow from "../images/circled-right-2.png";
import Logo from "../images/MYtineraryLogo.png";

const LandingTab = () => {
  return (
    <Col className="tab landing">
      <Row>
        <img id="app-logo" src={Logo} alt="MYtinerary Logo" />
      </Row>
      <Row id="main-button-container" className="my-2">
        <Col>
          <p className="text-center mx-auto py-1">
            Find your perfect trip, designed by insider who know and love their
            cities
          </p>
          <NavLink to="/cities">
            <img
              id="arrow-btn"
              className="rounded py-1 mx-auto d-block"
              src={Arrow}
              alt="In Button"
            />
          </NavLink>
        </Col>
      </Row>
      <Row className="my-2">
        <CitiesCarousel />
      </Row>
    </Col>
  );
};

export default LandingTab;
