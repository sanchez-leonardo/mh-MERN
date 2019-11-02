import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../images/homeIcon.png';

const Footer = () => {
  return (
    <footer>
      <NavLink to='/'>
        <img id='home-icon' src={HomeIcon} alt='Go Home' />
      </NavLink>
    </footer>
  );
};

export default Footer;
