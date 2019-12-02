import React, { Component } from "react";

import {
  Row,
  Col,
  UncontrolledCollapse,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getActivitiesByItinerary } from "../actions/activitiesActions";

import ActivitiesSlider from "./ActivitiesSlider";

class CollapsibleItinerary extends Component {
  render() {
    let imgStyle = {
      width: "90%"
    };

    return (
      <Col xs="11">
        <Card className="mt-2">
          <CardHeader>
            <Row>
              <Col xs="4">
                <img
                  src={this.props.itinerary.profile_pic}
                  alt="user profile pic"
                  style={imgStyle}
                />
                <p className="text-nowrap">{this.props.itinerary.user}</p>
              </Col>
              <Col xs="8">
                <h6>{this.props.itinerary.title}</h6>
                <Row>
                  <Col>
                    <p>{this.props.itinerary.rating + " likes"}</p>
                  </Col>
                  <Col>
                    <p>{this.props.itinerary.duration + "hs"}</p>
                  </Col>
                  <Col>
                    <p>{"$" + this.props.itinerary.total_price}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {this.props.itinerary.hashtags.map((hash, index) => {
                return (
                  <Col key={index}>
                    <p className="font-weight-light">{"#" + hash + " "}</p>
                  </Col>
                );
              })}
            </Row>
          </CardHeader>
          <CardBody>
            <p
              className="text-center"
              id={"itinerary" + this.props.itinerary._id}
              onClick={() => {
                this.props.getActivitiesByItinerary(this.props.itinerary._id);
              }}
            >
              View the whole thing
            </p>
            <UncontrolledCollapse
              toggler={"itinerary" + this.props.itinerary._id}
            >
              <h6>Activities</h6>
              <ActivitiesSlider
                activities={this.props.activities.activities.filter(
                  activity => activity.itinerary === this.props.itinerar_id
                )}
              ></ActivitiesSlider>
            </UncontrolledCollapse>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

CollapsibleItinerary.propTypes = {
  getActivitiesByItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activities: state.activities
});

export default connect(mapStateToProps, { getActivitiesByItinerary })(
  CollapsibleItinerary
);
