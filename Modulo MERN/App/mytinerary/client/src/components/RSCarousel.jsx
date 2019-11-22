import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import Slider from "react-slick";
import { Col } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCities } from "../actions/citiesActions";

class CitiesCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselCities: []
    };
  }

  componentDidMount() {
    this.props.getCities();

    let carouselCities = this.props.cities.cities.slice(0, 12);

    this.setState({ carouselCities });
  }

  render() {
    const settings = {
      className: "py-1",
      centerMode: true,
      infinite: true,
      centerPadding: "10px",
      slidesToShow: 1,
      speed: 500,
      rows: 2,
      slidesPerRow: 2
    };

    return (
      <Col className="col-11 mx-auto">
        <h4 className="text-center">Popular Mytineraries</h4>
        <Slider {...settings}>
          {this.state.carouselCities.map(city => (
            <div className="slide-city" key={city._id}>
              <NavLink to={"/itineraries/" + city._id + "/" + city.city}>
                <img
                  className="slide-city-img"
                  src={require("../images/cities/country-placeholder.webp")}
                  alt="placeholder"
                />
                <h6 className="slide-city-title text-center">{city.city}</h6>
              </NavLink>
            </div>
          ))}
        </Slider>
      </Col>
    );
  }
}

CitiesCarousel.propTypes = {
  getCities: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities
});

export default connect(mapStateToProps, { getCities })(CitiesCarousel);
