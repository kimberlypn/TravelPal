import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button, FormGroup, Input, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';

// Renders the details of an individual booked trip
export default function BookedCard({destination, startDate, endDate, price,
  id}) {
  // Sends a request to delete the trip
  function cancel() {
    api.delete_travel_date(id);
  }

  // TODO: Sends a request to edit the trip's details
  function edit() {
    $('#trip-details-' + id).toggle();
    $('#trip-edit-' + id).toggle();
  }

  // TODO: Fill in the card body
  return (
    <Col md="6">
      <Card>
        <TripCardHeader destination={destination} startDate={startDate}
          endDate={endDate} />
        <CardBody>
          <Row className="trip-edit" id={id}>
            <Col md="6">
              <Input />
            </Col>
            <Input />
          </Row>
          <Row className="trip-details" id={id}>
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
              <Button type="button" onClick={cancel}>Unbook</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

BookedCard.propTypes = {
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};
