import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';

// Renders the details of an individual past trip
export default function PastCard({destination, startDate, endDate, price,
  id}) {
  // Sends a request to delete the trip
  function remove() {
    api.delete_travel_date(id);
  }

  // TODO: Sends a request to edit the trip details
  function edit() {

  }

  // TODO: Fill in the card body
  return (
    <Col md="6">
      <Card>
        <TripCardHeader destination={destination} startDate={startDate}
          endDate={endDate} />
        <CardBody>
          <Row>
            <Col md="6">
              <p><b>Price: </b>${price}</p>
              <p><b>Hotel: </b></p>
              <p><b>Airline: </b></p>
            </Col>
            <Col md="6">
              <p><b>Departure Time: </b></p>
              <p><b>Arrival Time: </b></p>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={edit}>Edit</Button>
              <Button type="button" onClick={remove}>Delete</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

PastCard.propTypes = {
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};
