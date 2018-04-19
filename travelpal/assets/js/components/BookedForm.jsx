import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import api from '../api';

// Renders the form for a booked trip
function BookedForm(props) {
  // Grab all of the airlines to populate the dropdown
  let airlines = [];
  airlines.push(<option disabled value="" key="-1">--</option>);
  _.map(props.flights, (ff) =>
  airlines.push(<option key={ff.id} value={ff.id}>{ff.airline}</option>));

  // Grab all of the hotels to populate the dropdown
  let hotels = [];
  hotels.push(<option value="" key="-1">--</option>);
  _.map(props.hotels, (hh) =>
  hotels.push(<option key={hh.id} value={hh.id}>{hh.name}</option>));

  // Updates the state with the inputted values from the form
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    // Populate the fields that should not change
    data["id"] = props.id;
    data["destination"] = props.destination;
    data["start_date"] = props.startDate;
    data["end_date"] = props.endDate;
    props.dispatch({
      type: 'UPDATE_BOOKED_FORM',
      data: data,
    });
  }

  return (
    <React.Fragment>
      <Row>
        <Col md="6">
          <Form name="booked-left-form">
            <FormGroup name="cost">
              <Label for="cost"><b>Total Cost*</b></Label>
              <Input type="number" className="form-control" name="cost" min="0"
                step="100" required="" value={props.form.cost} onChange={update} />
              <p className="form-error" id="cost-error">
                Total cost must be at least $0.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="departure_time">
                <b>Departure Time (HH:MM AM/PM)*</b>
              </Label>
              <Input type="time" className="form-control" name="departure_time"
                required="" value={props.form.departure_time} onChange={update} />
              <p className="form-error" id="departure-error">
                Departure time must be before arrival time.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="arrival_time"><b>Arrival Time (HH:MM AM/PM)*</b></Label>
              <Input type="time" className="form-control" name="arrival_time"
                required="" value={props.form.arrival_time} onChange={update} />
              <p className="form-error" id="arrival-error">
                Arrival time must be after departure time.
              </p>
            </FormGroup>
            {/* Need start/end dates to validate arrival/departure times */}
            <Input type="hidden" name="start_date" value={props.startDate}></Input>
            <Input type="hidden" name="end_date" value={props.endDate}></Input>
          </Form>
        </Col>
        <Col md="6">
          <Form name="booked-right-form">
            <FormGroup>
              <Label for="flight_id"><b>Airline*</b></Label>
              <Input type="select" name="flight_id" value={props.form.flight_id}
                onChange={update}>
                {airlines}
              </Input>
              <p className="form-error" id="flight-error">
                You must select a flight.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="passengers">
                <b>Number of Passengers (self included)*</b>
              </Label>
              <Input type="number" className="form-control" name="passengers"
                min="1" required="" value={props.form.passengers} onChange={update} />
              <p className="form-error" id="passengers-error">
                Number of passengers must be at least 1.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="hotel_id"><b>Hotel</b></Label>
              <Input type="select" name="hotel_id" value={props.form.hotel_id}
                onChange={update}>
                {hotels}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="rooms"><b>Number of Rooms</b></Label>
              <Input type="number" className="form-control" name="rooms" min="0"
                required="" value={props.form.rooms} onChange={update} />
              <p className="form-error" id="rooms-error">
                Number of rooms must be at least 1 if you selected a hotel.
              </p>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <b>* = required</b>
        </Col>
      </Row>
    </React.Fragment>
  );
};

function state2props(state) {
  return {
    form: state.booked
  };
};

export default connect(state2props)(BookedForm);
