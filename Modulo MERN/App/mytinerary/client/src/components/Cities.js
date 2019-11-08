import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCities } from '../actions/citiesActions'


class Cities extends Component {

  componentDidMount() {
    this.props.getCities()
  }

  render() {

    const { cities } = this.props.cities
    return (
      <section className='tab cities'>
        <Container>
          <h1>Cities</h1>

          <ListGroup>
            {cities.map(city => {
              return (
                <ListGroupItem key={city._id}>
                  {city.city}, {city.country}
                </ListGroupItem>)
            })}
          </ListGroup>

        </Container>
      </section>
    );
  };
}

Cities.propTypes = {
  getCities = PropTypes.func.isRequired,
  cities = PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  cities: state.cities
})

export default connect(mapStateToProps, { getCities })(Cities);
