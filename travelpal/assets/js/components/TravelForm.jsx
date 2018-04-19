import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import api from '../api';

// Renders the edit form for a travel date
function TravelForm(props) {
  // Updates the state with the inputted values from the form
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    // Populate the fields that should not change
    data["id"] = props.id;
    data["user_id"] = props.userId;
    props.dispatch({
      type: 'UPDATE_TRAVEL_FORM',
      data: data
    });
  }

  return (
    <React.Fragment>
      <Row>
        <Col md="6">
          <Form name="travel-left-form">
            <FormGroup>
              <Label for="destination"><b>Destination*</b></Label>
              <Input type="text" className="form-control" name="destination"
                required="" value={props.form.destination} onChange={update} />
              <p className="form-error destination-error">
                You must enter a destination.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="start_date"><b>From Date (MM/DD/YYYY)*</b></Label>
              <Input type="date" className="form-control" name="start_date"
                required="" value={props.form.start_date} onChange={update} />
              <p className="form-error start-error">
                Start date must be before or equal to end date and cannot be
                in the past.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="end_date"><b>To Date (MM/DD/YYYY)*</b></Label>
              <Input type="date" className="form-control" name="end_date"
                required="" value={props.form.end_date} onChange={update} />
              <p className="form-error end-error">
                End date must be after or equal to start date.
              </p>
            </FormGroup>
          </Form>
        </Col>
        <Col md="6">
          <Form name="travel-right-form">
            <FormGroup>
              <Label for="price_limit"><b>Price Limit*</b></Label>
              <Input type="number" className="form-control" name="price_limit"
                min="0" step="100" required="" value={props.form.price_limit}
                onChange={update} />
              <p className="form-error price-error">
                Price limit must be at least $0.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="passengers"><b>Number of Passengers (self included)*</b></Label>
              <Input type="number" className="form-control" name="passengers"
                min="1" required="" value={props.form.passengers}
                onChange={update} />
              <p className="form-error passengers-error">
                Number of passengers must be at least 1.
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
    form: state.travel
  };
};

export default connect(state2props)(TravelForm);
