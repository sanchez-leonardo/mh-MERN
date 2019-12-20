import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Slider from "react-slick";

class ActivitiesSlider extends Component {
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  slides = () => {
    if (this.props.activities) {
      return this.props.activities.map(activity => (
        <p key={activity._id} className="text-center">
          {activity.title}
        </p>
      ));
    } else {
      return <p className="text-center">No activities in this itinerary</p>;
    }
  };

  render() {
    return (
      <Row>
        <Col xs="12" className="text-center">
          <h5>Activities</h5>
        </Col>
        <Col xs="12">
          <Slider {...this.settings}>{this.slides()}</Slider>
        </Col>
      </Row>
    );
  }
}

export default ActivitiesSlider;
