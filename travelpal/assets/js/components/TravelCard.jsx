import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';
import TravelForm from './TravelForm';

// Renders the details of an individual trip as a card
function TravelCard(props) {
  // Sends a request to delete a trip
  function remove() {
    api.delete_travel_date(props.trip.id);
  }

  // TODO: Sends a request to flights API with the trip details
  function search() {

  }

  // Toggles the edit form
  function edit() {
    $('#trip-details-' + props.trip.id).toggle();
    $('#trip-edit-' + props.trip.id).toggle();
  }

  // Clears and closes the edit form
  function cancel() {
    props.dispatch({
      type: 'CLEAR_TRAVEL_FORM',
    });
    $('#trip-details-' + props.trip.id).toggle();
    $('#trip-edit-' + props.trip.id).toggle();
  }

  // Sends a request to update the trip with the values from the form
  function submit(ev) {
    api.edit_travel_date(props.form);
    cancel();
  }

  return (
    <Col md="12">
      <Card>
        <TripCardHeader destination={props.trip.destination}
          startDate={props.trip.start_date} endDate={props.trip.end_date} />
          <CardBody className="trip-edit" id={"trip-edit-" + props.trip.id}>
            <TravelForm form={props.form} id={props.trip.id}
              userId={props.trip.user.id} />
            <Row>
              <Col md="12" className="trip-btn">
                <Button type="button" onClick={cancel}>Cancel</Button>
                <Button type="button" onClick={submit}>Submit</Button>
              </Col>
            </Row>
          </CardBody>
          <CardBody className="trip-details" id={"trip-details-" + props.trip.id}>
          <Row>
            <Col md="6">
              <p><b>Price Limit:</b> ${props.trip.price_limit}</p>
            </Col>
            <Col md="6">
              <p><b>Number of Passengers: </b>{props.trip.passengers}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={search}>Search</Button>
              <Button type="button" onClick={edit}>Edit</Button>
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
    form: state.travel
  };
};

export default connect(state2props)(TravelCard);
