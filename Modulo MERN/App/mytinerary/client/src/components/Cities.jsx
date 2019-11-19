import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Col, ListGroup, ListGroupItem } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCities } from "../actions/citiesActions";

import FilterForm from "./FIlterForm";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCities: []
    };
  }

  componentDidMount() {
    this.props.getCities();
  }

  filterCities = filterString => {
    const { cities } = this.props.cities;

    let filteredCities = cities.filter(
      city =>
        city.city.slice(0, filterString.length).toLowerCase() ===
        filterString.toLowerCase()
    );

    this.setState({
      filteredCities
    });
  };

  citiesToRender = () => {
    if (this.state.filteredCities.length === 0) {
      return this.props.cities.cities;
    } else {
      return this.state.filteredCities;
    }
  };

  render() {
    return (
      <Col className="tab cities">
        <h1 className="text-center">Cities</h1>

        <FilterForm filterCities={this.filterCities}></FilterForm>
        <ListGroup>
          {this.citiesToRender().map(city => {
            return (
              <ListGroupItem key={city._id}>
                <NavLink to={"/itineraries/" + city._id}>
                  {city.city}, {city.country}
                </NavLink>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    );
  }
}

Cities.propTypes = {
  getCities: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities
});

export default connect(mapStateToProps, { getCities })(Cities);
