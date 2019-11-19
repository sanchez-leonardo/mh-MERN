import React from "react";
import { NavLink } from "react-router-dom";

import { Col } from "reactstrap";

import HomeIcon from "../images/homeIcon.png";

const Footer = () => {
  return (
    <Col>
      <NavLink to="/">
        <img
          id="home-icon"
          className="rounded p-0 mx-auto d-block"
          src={HomeIcon}
          alt="Go Home"
        />
      </NavLink>
    </Col>
  );
};

export default Footer;
