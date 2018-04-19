import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';
import BookedForm from './BookedForm';
import BookedTripInfo from './BookedTripInfo';

// Renders the details of an individual booked trip
function BookedCard(props) {
  // Sends a request to delete the trip
  function unbook() {
    api.delete_booked_trip(props.trip.id);
  }

  // Toggles the edit form
  function toggle() {
    $('#trip-details-' + props.trip.id).toggle();
    $('#trip-edit-' + props.trip.id).toggle();
  }

  // Clears and closes the edit form
  function cancel() {
    props.dispatch({
      type: 'CLEAR_BOOKED_FORM',
    });
    toggle();
  }

  // Sends a request to update the booked trip with the values from the form
  function submit(ev) {
    api.edit_booked_trip(props.form);
    cancel();
  }

  function validate() {
    let formLeft = document.forms["booked-left-form"];
    let formRight = document.forms["booked-right-form"];
    let cost = formLeft["cost"].value;
    let departureTime = formLeft["departure_time"].value;
    let arrivalTime = formLeft["arrival_time"].value;
    let startDate = new Date(formLeft["start_date"].value);
    let endDate = new Date(formLeft["end_date"].value);
    let flight = formRight["flight_id"].value;
    let passengers = formRight["passengers"].value;
    let hotel = formRight["hotel_id"].value;
    let rooms = formRight["rooms"].value;
    if (!cost || cost < 0) {
      $("#cost-error").toggle();
      return false;
    }
    else if (!departureTime || !arrivalTime ||
      (startDate.getTime() == endDate.getTime() && departureTime > arrivalTime)) {
        $("#departure-error").toggle();
        $("#arrival-error").toggle();
        return false;
    }
  }

  return (
    <Col md="12">
      <Card>
        <TripCardHeader destination={props.trip.destination}
          startDate={props.trip.start_date} endDate={props.trip.end_date} />
        <CardBody className="trip-edit" id={"trip-edit-" + props.trip.id}>
          <BookedForm form={props.form} id={props.trip.id}
            destination={props.trip.destination}
            startDate={props.trip.start_date} endDate={props.trip.end_date}
            flights={props.flights} hotels={props.hotels} />
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={cancel}>Cancel</Button>
              <Button type="submit" onClick={validate}>Submit</Button>
            </Col>
          </Row>
        </CardBody>
        <CardBody className="trip-details" id={"trip-details-" + props.trip.id}>
          <BookedTripInfo trip={props.trip} />
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={toggle}>Edit</Button>
              <Button type="button" onClick={unbook}>Unbook</Button>
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

export default connect(state2props)(BookedCard);
