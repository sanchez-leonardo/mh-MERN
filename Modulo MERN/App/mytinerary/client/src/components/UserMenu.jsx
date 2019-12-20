import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logUserOut } from "../actions/usersActions";

import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

import UserIcon from "../images/user.png";

const UserMenu = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const dispatch = useDispatch();

  const logOut = () => {
    if (window.localStorage.getItem("mytinerarytoken")) {
      dispatch(logUserOut());
    }
  };

  return (
    <div>
      <Button id="Popover1" type="button" className="user-menu">
        <img src={UserIcon} id="user-menu-img" alt="User Menu" />
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>Account</PopoverHeader>
        <PopoverBody>
          <NavLink to="/log-in">
            <p>Log In</p>
          </NavLink>
          <NavLink to="/sign-up">
            <p>Sign up</p>
          </NavLink>
          <NavLink to="/" onClick={logOut}>
            <p>Log Out</p>
          </NavLink>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default UserMenu;
