import React, { Component } from "react";

import {
  Row,
  Col,
  UncontrolledCollapse,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getActivitiesByItinerary } from "../actions/activitiesActions";
import { likeItinerary, dislikeItinerary } from "../actions/usersActions";

import ActivitiesSlider from "./ActivitiesSlider";

class CollapsibleItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false
    };
  }

  componentDidMount() {
    this.isFav();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userFavsIds.includes(this.props.itinerary._id) !==
      this.props.userFavsIds.includes(this.props.itinerary._id)
    ) {
      this.isFav();
    }
  }

  loadActivities = () => {
    if (!this.props.activities[this.props.itinerary._id]) {
      this.props.getActivitiesByItinerary(this.props.itinerary._id);
    }
  };

  isFav = () => {
    if (this.props.userFavsIds.includes(this.props.itinerary._id)) {
      this.setState({ ...this.state, fav: true });
    } else {
      this.setState({ ...this.state, fav: false });
    }
  };

  favouriteClickin = async () => {
    if (this.state.fav) {
      await this.props.dislikeItinerary(
        this.props.userId,
        this.props.itinerary._id,
        this.props.currentToken
      );
    } else {
      await this.props.likeItinerary(
        this.props.userId,
        this.props.itinerary._id,
        this.props.currentToken
      );
    }
  };

  btnPlusOrMinus = () => {
    if (this.state.fav) {
      return <span>-</span>;
    } else {
      return <span>+</span>;
    }
  };

  btnColor = () => {
    if (this.state.fav) {
      return "danger";
    } else {
      return "success";
    }
  };

  render() {
    let imgStyle = {
      width: "90%"
    };

    return (
      <Col xs="12">
        <Card className="mt-2">
          <CardHeader>
            <Row>
              <Col className="text-center p-0 m-auto" xs="2">
                <Button
                  onClick={this.favouriteClickin}
                  color={this.btnColor()}
                  disabled={this.props.userLoading}
                  block
                >
                  {this.btnPlusOrMinus()}
                </Button>
              </Col>
              <Col xs="10" className="text-center">
                <h5>{this.props.itinerary.title}</h5>
              </Col>
            </Row>

            <Row noGutters>
              <Col xs="auto">
                <p>{this.props.itinerary.rating + "k likes"}</p>
              </Col>
              <Col xs="auto" className="mx-auto px-0">
                <p>{this.props.itinerary.duration + "hs"}</p>
              </Col>
              <Col xs="auto" className="mx-auto px-0">
                <p>{"$" + this.props.itinerary.total_price}</p>
              </Col>
            </Row>

            <Row>
              {this.props.itinerary.hashtags.map((hash, index) => {
                return (
                  <Col xs="auto" className="mx-auto px-0" key={index}>
                    <p className="font-weight-light my-0">{"#" + hash + " "}</p>
                  </Col>
                );
              })}
            </Row>
          </CardHeader>
          <UncontrolledCollapse
            toggler={"itinerary" + this.props.itinerary._id}
            onEntering={this.loadActivities}
          >
            <CardBody>
              <Row>
                <Col xs="5">
                  <img
                    src={this.props.itinerary.profile_pic}
                    alt="user profile pic"
                    style={imgStyle}
                  />
                </Col>
                <Col xs="7">
                  <p className="text-nowrap">{this.props.itinerary.user}</p>
                </Col>
              </Row>

              <ActivitiesSlider
                activities={this.props.activities[this.props.itinerary._id]}
              ></ActivitiesSlider>
            </CardBody>
          </UncontrolledCollapse>
          <CardFooter className="m-0 p-0">
            <Button
              className="m-0 p-0"
              color="secondary"
              size="md"
              block
              id={"itinerary" + this.props.itinerary._id}
            >
              View the whole thing
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

CollapsibleItinerary.propTypes = {
  getActivitiesByItinerary: PropTypes.func.isRequired,
  likeItinerary: PropTypes.func.isRequired,
  dislikeItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activities: state.activities.activities,
  userFavsIds: state.user.userFavs.map(fav => fav._id),
  userId: state.user.user.userId,
  userLoading: state.user.loading,
  currentToken: state.user.currentToken
});

export default connect(mapStateToProps, {
  getActivitiesByItinerary,
  likeItinerary,
  dislikeItinerary
})(CollapsibleItinerary);
