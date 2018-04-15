import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';
import BookedForm from './BookedForm';

// Renders the details of an individual past trip
export default function PastCard({form, trip, flights, hotels}) {
  // Sends a request to delete the trip
  function remove() {
    api.delete_booked_trip(trip.id);
  }

  // Toggles the edit form
  function edit() {
    $('#trip-details-' + trip.id).toggle();
    $('#trip-edit-' + trip.id).toggle();
  }

  return (
    <Col md="12">
      <Card>
        <TripCardHeader destination={trip.destination}
          startDate={trip.startDate} endDate={trip.endDate} />
        <BookedForm form={form} id={trip.id} destination={trip.destination}
          startDate={trip.startDate} endDate={trip.endDate}
          flights={trip.flights} hotels={hotels} />
        <CardBody className="trip-details" id={"trip-details-" + trip.id}>
          <Row>
            <Col md="6">
              <p><b>Total Cost: </b>${trip.cost}</p>
              <p>
                <b>Departure Time: </b>{trip.departureTime.substring(0, 5)}
              </p>
              <p>
                <b>Arrival Time: </b>{trip.arrivalTime.substring(0, 5)}
              </p>
            </Col>
            <Col md="6">
              <p><b>Airline: </b>{trip.flight.airline}</p>
              <p><b>Number of Passengers: </b>{trip.passengers}</p>
              <p><b>Hotel: </b>{hotel ? trip.hotel.name : "N/A"}</p>
              <p>
                <b>Number of Rooms: </b>{(trip.rooms > 0) ? trip.rooms : "N/A"}
              </p>
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
  trip: PropTypes.array.isRequired,
  flights: PropTypes.array.isRequired,
  hotels: PropTypes.array.isRequired,
};
