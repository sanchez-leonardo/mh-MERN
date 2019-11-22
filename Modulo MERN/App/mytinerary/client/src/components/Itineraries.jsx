import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getItinerariesByCity } from "../actions/itinerariesActions";
import { getCityById } from "../actions/citiesActions";

import CollapsibleItinerary from "./CollapsibleItinerary";

class Itineraries extends Component { 

  componentDidMount() {
    const { cityId } = this.props.match.params;
    
    this.props.getItinerariesByCity(cityId);
  }

  render() {
    const cityName = this.props.match.params.cityName

    return (
      <Container fluid>
        <Row>
          <Col>
            <img
              className="itineraries-city-img"
              src={require("../images/cities/country-placeholder.webp")}
              alt="placeholder"
            />
            <h4 className="itineraries-city-img-header">{cityName}</h4>
          </Col>
        </Row>
        <Row>
          {this.props.itineraries.itineraries.map(itinerary => {
            return (
              <CollapsibleItinerary itinerary={itinerary}  key={itinerary._id}></CollapsibleItinerary>
            );
          })}
        </Row>
      </Container>
    );
  }
}

Itineraries.propTypes = {
  getCityById: PropTypes.func.isRequired,
  getItinerariesByCity: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired,
  itineraries: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities,
  itineraries: state.itineraries
});

export default connect(mapStateToProps, { getItinerariesByCity, getCityById })(Itineraries);
