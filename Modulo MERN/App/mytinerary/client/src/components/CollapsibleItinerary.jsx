import React from 'react';
// import { Link } from "react-router-dom";
import {
  Row,
  Col,
  UncontrolledCollapse,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';

import ActivitiesSlider from './ActivitiesSlider';

const CollapsibleItinerary = props => {
  const itinerary = props.itinerary;

  const imgStyle = {
    width: '90%'
  };

  return (
    <Card className='mt-2'>
      <CardHeader>
        <Row>
          <Col xs='4'>
            <img
              src={require('../images/users/' + itinerary.profile_pic)}
              alt='user profile pic'
              style={imgStyle}
            />
            <p className='text-nowrap'>{itinerary.user}</p>
          </Col>
          <Col xs='8'>
            <h6>{itinerary.title}</h6>
            <Row>
              <Col>
                <p>{itinerary.rating + ' likes'}</p>
              </Col>
              <Col>
                <p>{itinerary.duration + 'hs'}</p>
              </Col>
              <Col>
                <p>{'$' + itinerary.price}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {itinerary.hashtags.map((hash, index) => {
            return (
              <Col>
                <p className='font-weight-light' key={index}>
                  {'#' + hash + ' '}
                </p>
              </Col>
            );
          })}
        </Row>
      </CardHeader>
      <CardBody>
        <p className='text-center' id={'itinerary' + itinerary._id}>
          View the whole thing
        </p>
        <UncontrolledCollapse toggler={'itinerary' + itinerary._id}>
          <h6>Activities</h6>
          <ActivitiesSlider
            activities={itinerary.activities}
          ></ActivitiesSlider>
        </UncontrolledCollapse>
      </CardBody>
    </Card>
  );
};

export default CollapsibleItinerary;
