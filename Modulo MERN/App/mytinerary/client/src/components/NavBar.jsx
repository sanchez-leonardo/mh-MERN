import React, { useState } from "react";
import {
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import UserMenu from "./UserMenu";

const NavBar = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Col>
      <Navbar color="faded" light className="p-0">
        <NavbarBrand className="mr-auto">
          <UserMenu />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="#">Super Awesome Options</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Super Awesome Options</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Col>
  );
};

export default NavBar;
