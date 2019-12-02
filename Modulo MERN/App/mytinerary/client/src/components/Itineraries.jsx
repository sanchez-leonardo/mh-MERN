import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getItinerariesByCity } from "../actions/itinerariesActions";

import CollapsibleItinerary from "./CollapsibleItinerary";

class Itineraries extends Component {
  componentDidMount() {
    const { cityId } = this.props.match.params;

    this.props.getItinerariesByCity(cityId);
  }

  render() {
    const cityName = this.props.match.params.cityName;
    const imgStyle = {
      maxheight: "3rem"
    };

    return (
      <Container fluid>
        <Row noGutters>
          <Col xs="auto">
            <img
              style={imgStyle}
              className="itineraries-city-img"
              src={require("../images/cities/country-placeholder.webp")}
              alt="placeholder"
            />
            <h4 className="itineraries-city-img-header text-center">
              {cityName}
            </h4>
          </Col>
        </Row>
        <Row noGutters>
          {this.props.itineraries.itineraries.map(itinerary => {
            return (
              <CollapsibleItinerary
                itinerary={itinerary}
                key={itinerary._id}
              ></CollapsibleItinerary>
            );
          })}
        </Row>
      </Container>
    );
  }
}

Itineraries.propTypes = {
  getItinerariesByCity: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired,
  itineraries: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities,
  itineraries: state.itineraries
});

export default connect(mapStateToProps, { getItinerariesByCity })(Itineraries);
