import React from 'react';

const ActivitiesSlider = props => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <p>lalala</p>
      </Slider>
    </div>
  );
};

export default ActivitiesSlider;
