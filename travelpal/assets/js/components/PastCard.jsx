import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';
import BookedTripInfo from './BookedTripInfo';
import PastForm from './PastForm';

// Renders the details of an individual past trip
function PastCard(props) {
  // Sends a request to delete the trip
  function remove() {
    api.delete_booked_trip(props.trip.id);
  }

  // Toggles the edit form
  function toggle() {
    $('#trip-details-' + props.trip.id).toggle();
    $('#trip-edit-' + props.trip.id).toggle();
    // Hide any errors
    $(".form-error").hide();
  }

  // Clears and closes the edit form
  function cancel() {
    props.dispatch({
      type: 'CLEAR_BOOKED_FORM',
    });
    toggle();
  }

  // Sends a request to update the past trip with the values from the form
  function submit(ev) {
    api.edit_booked_trip(props.form);
    // Clear and close the form afterward
    cancel();
  }

  // Validates the form inputs
  function validate() {
    let form = document.forms["past-form"];
    let summary = form["summary"].value;
    let successful = true;
    // Check if the user wrote a summary
    if (!summary) {
      $(".summary-error").show();
      successful = false;
    }
    // Successfully validated, so submit the form
    if (successful) {
      // Hide any errors
      $(".form-error").hide();
      submit();
    }
  }

  return (
    <Col md="12">
      <Card>
        <TripCardHeader destination={props.trip.destination}
          startDate={props.trip.start_date} endDate={props.trip.end_date} />
        <CardBody className="trip-edit" id={"trip-edit-" + props.trip.id}>
          <PastForm trip={props.trip} form={props.form} />
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={cancel}>Cancel</Button>
              <Button type="button" onClick={validate}>Submit</Button>
            </Col>
          </Row>
        </CardBody>
        <CardBody className="trip-details" id={"trip-details-" + props.trip.id}>
          <BookedTripInfo trip={props.trip} />
          <Row>
            <Col md="12">
              <p><b>Trip Summary: </b></p>
              <p>{props.trip.summary ? props.trip.summary : "N/A"}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={toggle}>Edit</Button>
              <Button type="button" onClick={remove}>Delete</Button>
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

export default connect(state2props)(PastCard);
