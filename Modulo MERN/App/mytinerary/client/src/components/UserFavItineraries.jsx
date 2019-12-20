import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import CollapsibleItinerary from "./CollapsibleItinerary";

class UserFavItineraries extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h4 className="text-center">
              Your Favourites
            </h4>
          </Col>
        </Row>
        <Row noGutters>

          {this.props.userFavs.map(itinerary => {
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

UserFavItineraries.propTypes = {
  userFavs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userFavs: state.user.userFavs
});

export default connect(mapStateToProps, null)(UserFavItineraries);
