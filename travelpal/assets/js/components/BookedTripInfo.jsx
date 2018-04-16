import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'reactstrap';

// Renders the details of a booked trip
export default function BookedTripInfo({trip}) {
  return (
    <Row>
      <Col md="6">
        <p><b>Total Cost: </b>${trip.cost}</p>
        <p>
          <b>Departure Time: </b>
          {trip.departure_time.substring(0, 5)}
        </p>
        <p>
          <b>Arrival Time: </b>
          {trip.arrival_time.substring(0, 5)}
        </p>
      </Col>
      <Col md="6">
        <p><b>Airline: </b>{trip.flight.airline}</p>
        <p><b>Number of Passengers: </b>{trip.passengers}</p>
        <p>
          <b>Hotel: </b>
          {trip.hotel ? trip.hotel.name : "N/A"}
        </p>
        <p>
          <b>Number of Rooms: </b>
          {trip.rooms > 0 ? trip.rooms : "N/A"}
        </p>
      </Col>
    </Row>
  );
};

BookedTripInfo.propTypes = {
  trip: PropTypes.object.isRequired
};
