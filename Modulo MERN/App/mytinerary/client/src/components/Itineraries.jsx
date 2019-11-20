import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getItinerariesByCity } from '../actions/itinerariesActions';

import CollapsibleItinerary from './CollapsibleItinerary';

class Itineraries extends Component {
  componentDidMount() {
    const { cityId } = this.props.match.params;

    this.props.getItinerariesByCity(cityId);
  }

  render() {
    const cityName = this.props.cities.cities.filter(
      city => city._id === this.props.match.params.cityId
    )[0].name;

    return (
      <Container fluid>
        <Row>
          <Col>
            <img
              className='itineraries-city-img'
              src={require('../images/cities/country-placeholder.webp')}
              alt='placeholder'
            />
            <h4 className='itineraries-city-img-header'>{cityName}</h4>
          </Col>
        </Row>
        <Row>
          {this.props.itineraries.itineraries.map(itinerary => {
            return (
              <CollapsibleItinerary itinerary='itinerary'></CollapsibleItinerary>
            );
          })}
        </Row>
      </Container>
    );
  }
}

Itineraries.propTypes = {
  cities: PropTypes.object.isRequired,
  getItinerariesByCity: PropTypes.func.isRequired,
  itineraries: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities,
  itineraries: state.itineraries
});

export default connect(mapStateToProps, { getItinerariesByCity })(Itineraries);
