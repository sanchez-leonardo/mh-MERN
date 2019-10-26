import React from 'react';
// Para direccionar a log in o sign up
// import { NavLink } from 'react-router-dom';

import UserIcon from '../../images/user.png';

const UserMenu = () => {
  return (
    <div className='menu user'>
      <img src={UserIcon} alt='User Menu' />
    </div>
  );
};

export default UserMenu;
