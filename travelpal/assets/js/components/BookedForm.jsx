import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import api from '../api';

// Renders the form for a booked trip
function BookedForm(props) {
  // Grab all of the hotels to populate the dropdown
  let hotels = [];
  let propHotels = props.hotels.filter(hotel =>
    hotel.result_from == props.trip.destination.toLowerCase());
  hotels.push(<option value="" key="-1">--</option>);
  _.map(propHotels, (hh) =>
  hotels.push(<option key={hh.id} value={hh.id}>{hh.name}</option>));
  
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    // Populate the fields that should not change
    data["id"] = props.id;
    data["destination"] = props.trip.destination;
    data["start_date"] = props.trip.start_date;
    data["end_date"] = props.trip.end_date;
    data["departure_time"] = props.trip.departure_time;
    data["arrival_time"] = props.trip.arrival_time;
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
              <p className="form-error cost-error">
                Total cost must be at least $0.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="passengers">
                <b>Number of Passengers (self included)*</b>
              </Label>
              <Input type="number" className="form-control" name="passengers"
                min="1" required="" value={props.form.passengers} onChange={update} />
              <p className="form-error passengers-error">
                Number of passengers must be at least 1.
              </p>
            </FormGroup>
            <Input type="hidden" name="start_date" value={props.startDate}></Input>
            <Input type="hidden" name="end_date" value={props.endDate}></Input>
          </Form>
        </Col>
        <Col md="6">
          <Form name="booked-right-form">
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
              <p className="form-error rooms-error">
                Number of rooms must be at least 1 if you selected a hotel;
                else, 0.
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
