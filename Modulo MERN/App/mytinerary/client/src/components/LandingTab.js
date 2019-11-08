import React from 'react';
import { NavLink } from 'react-router-dom';

import Arrow from '../images/circled-right-2.png';
import Logo from '../images/MYtineraryLogo.png';

const LandingTab = () => {
  return (
    <section className='tab landing'>
      <img id='app-logo' src={Logo} alt='MYtinerary Logo' />
      <div id='main-button-container'>
        <p>
          Find your perfect trip, designed by insider who know and love their
          cities
        </p>
        <h3>Start Browsing!</h3>
        <NavLink to='/cities'>
          <img id='arrow-btn' src={Arrow} alt='In Button' />
        </NavLink>
      </div>
      <div id='forms-nav-container'>
        <h3>Want to build you own MYtinerary?</h3>
        <NavLink to='log-in'>Log In</NavLink>
        <NavLink to='sign-up'>Create Account</NavLink>
      </div>
    </section>
  );
};

export default LandingTab;
