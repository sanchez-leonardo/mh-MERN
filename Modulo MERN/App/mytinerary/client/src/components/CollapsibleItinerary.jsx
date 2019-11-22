import React from "react";
import { Link } from "react-router-dom";
import { Row, UncontrolledCollapse, CardBody, Card } from "reactstrap";

import ActivitiesSlider from "./ActivitiesSlider";

const CollapsibleItinerary = props => {
  const itinerary = props.itinerary;

  return (
    <Row>
      <Card>
        <CardBody>
          <div>
            <img
              src={require("../images/users/" + itinerary.profile_pic)}
              alt="user profile pic"
            />
            <h5>{itinerary.user}</h5>
          </div>
          <div>
            <h6>{itinerary.title}</h6>
            <div>
              <p>{itinerary.rating + "likes"}</p>
              <p>{itinerary.duration + "hs"}</p>
              <p>{"$" + itinerary.price}</p>
            </div>
            <div>
              {itinerary.hashtags.map(hash => {
                return <Link>{hash}</Link>;
              })}
            </div>
          </div>
          <p id={"itinerary" + itinerary._id}>View the whole thing</p>
          <UncontrolledCollapse toggler={"itinerary" + itinerary._id}>
            <h6>Activities</h6>
            <ActivitiesSlider
              activities={itinerary.activities}
            ></ActivitiesSlider>
          </UncontrolledCollapse>
        </CardBody>
      </Card>
    </Row>
  );
};

export default CollapsibleItinerary;
