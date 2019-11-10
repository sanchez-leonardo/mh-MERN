import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import UserIcon from '../images/user.png';

const UserMenu = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button id='Popover1' type='button' className='user-menu'>
        <img src={UserIcon} className='user-menu-img' alt='User Menu' />
      </Button>
      <Popover
        placement='bottom'
        isOpen={popoverOpen}
        target='Popover1'
        toggle={toggle}
      >
        <PopoverHeader>Account</PopoverHeader>
        <PopoverBody>
          <NavLink to='/log-in'>
            <p>Log In</p>
          </NavLink>
          <NavLink to='/sign-up'>
            <p>Sign up</p>
          </NavLink>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default UserMenu;
