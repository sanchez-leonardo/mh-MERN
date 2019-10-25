import React from 'react';
import { NavLink } from 'react-router-dom';

import Carousel from './Carousel';

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
        <NavLink to='/cities'>
          <img id='arrow-btn' src={Arrow} alt='In Button' />
        </NavLink>
      </div>
      <Carousel />
    </section>
  );
};

export default LandingTab;
