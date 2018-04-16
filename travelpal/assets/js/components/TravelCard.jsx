import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';

// Renders the details of an individual trip as a card
export default function TravelCard({destination, startDate, endDate,
  priceLimit, passengers, id}) {
  // Sends a request to delete a trip
  function cancel() {
    api.delete_travel_date(id);
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
        <TripCardHeader destination={destination} startDate={startDate}
          endDate={endDate} />
        <CardBody>
          <Row>
            <Col md="12">
              <p><b>Price Limit:</b> ${priceLimit}</p>
              <p><b>Number of Passengers: </b>{passengers}</p>
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

TravelCard.propTypes = {
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  priceLimit: PropTypes.number.isRequired,
  passengers: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};
