import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';

// Renders the details of an individual trip as a card
function TravelCard(props) {
  // Sends a request to delete a trip
  function cancel() {
    api.delete_travel_date(props.trip.id);
  }

  // TODO: Sends a request to flights API with the trip details
  function search() {

  }

  // TODO: Sends a request to edit the trip's details
  function edit() {

  }

  // TODO: Fill in missing card body details
  return (
    <Col md="12">
      <Card>
        <TripCardHeader destination={props.trip.destination}
          startDate={props.trip.start_date} endDate={props.trip.end_date} />
        <CardBody>
          <Row>
            <Col md="12">
              <p><b>Price Limit:</b> ${props.trip.price_limit}</p>
              <p><b>Number of Passengers: </b>{props.trip.passengers}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={search}>Search</Button>
              <Button type="button" onClick={edit}>Edit</Button>
              <Button type="button" onClick={cancel}>Delete</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

function state2props(state) {
  return {
    form: state.booked
  };
};

export default connect(state2props)(TravelCard);
