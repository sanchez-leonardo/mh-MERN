import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { storeUserFromToken } from "../actions/usersActions";

import {
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

import UserMenu from "./UserMenu";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar = () =>
    this.setState({ ...this.state, collapsed: !this.state.collapsed });

  async componentDidMount() {
    if (this.getQueryVariable("token")) {
      window.localStorage.setItem(
        "mytinerarytoken",
        this.getQueryVariable("token")
      );
      window.location.search = "";
    }

    if (window.localStorage.getItem("mytinerarytoken")) {
      await this.props.storeUserFromToken(
        window.localStorage.getItem("mytinerarytoken")
      );
    }
  }

  getQueryVariable = variable => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };

  render() {
    return (
      <Col>
        <Navbar color="faded" light className="p-0">
          <NavbarBrand>
            <UserMenu />
          </NavbarBrand>

          <p>{this.props.userName}</p>

          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem tag="h4" className="text-center" >
                <NavLink to="/favourites">Favourite Itineraries</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Col>
    );
  }
}

NavBar.propTypes = {
  storeUserFromToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userName: state.user.user.userName,
  loggedUser: state.user.logged
});

export default connect(mapStateToProps, { storeUserFromToken })(NavBar);
