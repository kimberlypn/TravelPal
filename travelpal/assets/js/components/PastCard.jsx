import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';
import BookedForm from './BookedForm';

// Renders the details of an individual past trip
export default function PastCard({form, destination, startDate, endDate,
  departureTime, arrivalTime, passengers, cost, rooms, flight, hotel, flights,
  hotels, id}) {
  // Sends a request to delete the trip
  function remove() {
    api.delete_booked_trip(id);
  }

  // Toggles the edit form
  function edit() {
    $('#trip-details-' + id).toggle();
    $('#trip-edit-' + id).toggle();
  }

  return (
    <Col md="12">
      <Card>
        <TripCardHeader destination={destination} startDate={startDate}
          endDate={endDate} />
        <BookedForm form={form} id={id} destination={destination}
          startDate={startDate} endDate={endDate} flights={flights}
          hotels={hotels} />
        <CardBody className="trip-details" id={"trip-details-" + id}>
          <Row>
            <Col md="6">
              <p><b>Total Cost: </b>${cost}</p>
              <p><b>Departure Time: </b>{departureTime.substring(0, 5)}</p>
              <p><b>Arrival Time: </b>{arrivalTime.substring(0, 5)}</p>
            </Col>
            <Col md="6">
              <p><b>Airline: </b>{flight.airline}</p>
              <p><b>Number of Passengers: </b>{passengers}</p>
              <p><b>Hotel: </b>{hotel ? hotel.name : "N/A"}</p>
              <p><b>Number of Rooms: </b>{rooms ? rooms : "N/A"}</p>
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
  form: PropTypes.object.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  passengers: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  rooms: PropTypes.number,
  flight: PropTypes.object.isRequired,
  hotel: PropTypes.object,
  flights: PropTypes.array.isRequired,
  hotels: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired
};
