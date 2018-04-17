import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Input, Label } from 'reactstrap';

import api from '../api';

// Renders the form for a past trip
function PastForm(props) {
  // Updates the state with the inputted values from the form
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    // Populate the fields that should not change
    data["id"] = props.trip.id;
    data["destination"] = props.trip.destination;
    data["start_date"] = props.trip.start_date;
    data["end_date"] = props.trip.end_date;
    data["departure_time"] = props.trip.departure_time;
    data["arrival_time"] = props.trip.arrival_time;
    data["passengers"] = props.trip.passengers;
    data["cost"] = props.trip.cost;
    data["rooms"] = props.trip.room;
    data["flight_id"] = props.trip.flight.id;
    if (props.trip.hotel) {
      data["hotel_id"] = props.trip.hotel.id
    }
    props.dispatch({
      type: 'UPDATE_BOOKED_FORM',
      data: data,
    });
  }

  return (
      <Row>
        <Col md="12">
          <FormGroup>
            <Label for="summary"><b>Trip Summary</b></Label>
            <Input type="textarea" className="form-control" name="summary"
              required="" value={props.form.summary} onChange={update} />
          </FormGroup>
        </Col>
      </Row>
  );
};

function state2props(state) {
  return {
    form: state.booked
  };
};

export default connect(state2props)(PastForm);
