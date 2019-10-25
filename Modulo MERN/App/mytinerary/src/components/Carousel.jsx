import React from 'react';
import CountryImg from '../images/country-placeholder.webp';
import LeftArrow from '../images/left-arrow.png';
import RightArrow from '../images/right-arrow.png';

const Carousel = () => {
  return (
    <div id='carousel-wrapper'>
      <div id='carousel'>
        <div className='page'>
          <img src={CountryImg} alt='Country Image1' />
          <img src={CountryImg} alt='Country Image2' />
          <img src={CountryImg} alt='Country Image3' />
          <img src={CountryImg} alt='Country Image4' />
        </div>
        <div className='page'>
          <img src={CountryImg} alt='Country Image5' />
          <img src={CountryImg} alt='Country Image6' />
          <img src={CountryImg} alt='Country Image7' />
          <img src={CountryImg} alt='Country Image8' />
        </div>
        <div className='page'>
          <img src={CountryImg} alt='Country Image9' />
          <img src={CountryImg} alt='Country Image10' />
          <img src={CountryImg} alt='Country Image11' />
          <img src={CountryImg} alt='Country Image12' />
        </div>
      </div>
      <div id='carousel-control'>
        <img className='arrow left' src={LeftArrow} alt='Carousel left' />
        <img className='arrow right' src={RightArrow} alt='Carousel right' />
      </div>
    </div>
  );
};

export default Carousel;
