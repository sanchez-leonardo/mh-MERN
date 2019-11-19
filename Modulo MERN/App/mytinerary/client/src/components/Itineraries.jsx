import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getItinerariesByCity } from "../actions/itinerariesActions";

class Itineraries extends Component {
  componentDidMount() {
    const { cityId } = this.props.match.params;

    this.props.getItinerariesByCity(cityId);
  }

  render() {
    return this.props.itineraries.itineraries.map(itinerary => {
      return <p key={itinerary._id}>{itinerary.user}</p>;
    });
  }
}

Itineraries.propTypes = {
  getItinerariesByCity: PropTypes.func.isRequired,
  itineraries: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries
});

export default connect(mapStateToProps, { getItinerariesByCity })(Itineraries);
