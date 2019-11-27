import React from 'react';
import { Col } from 'reactstrap';
import Slider from 'react-slick';

const ActivitiesSlider = props => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <Col>
          <p>lalala</p>
        </Col>
        <Col>
          <p>lalala</p>
        </Col>
        <Col>
          <p>lalala</p>
        </Col>
        <Col>
          <p>lalala</p>
        </Col>
      </Slider>
    </div>
  );
};

export default ActivitiesSlider;
