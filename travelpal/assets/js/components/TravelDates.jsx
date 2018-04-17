import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';

import api from '../api';
import TravelCard from './TravelCard';
import TravelForm from './TravelForm';

// Renders the user's travel dates
function TravelDates(props) {
  let trips = _.map(props.travelDates, function(tt) {
    return <TravelCard key={tt.id} trip={tt} form={props.form} />;
  });

  // Display none message if no travel dates
  if (trips.length == 0) {
    trips = <Col><b>You have no dates set aside for travel.</b></Col>;
  }

  // Toggles the new travel date form
  function toggle() {
    $('#travel-dates').toggle();
    $('#trip-create').toggle();
  }

  // Closes the new travel date form
  function cancel() {
    props.dispatch({
      type: 'CLEAR_TRAVEL_FORM',
    });
    toggle();
  }

  // Sends a request to create a new travel date
  function submit() {
    api.create_travel_date(props.form);
    // Clear and close the form afterward
    cancel();
  }

  return (
    <div className="page-content">
      <div id="trip-create">
        <Row>
          <Col md="12">
            <h3>New Travel Date</h3>
            <Card>
              <CardBody>
                <TravelForm form={props.form} userId={props.userId} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="trip-btn">
            <Button type="button" onClick={cancel}>Cancel</Button>
            <Button type="button" onClick={submit}>Submit</Button>
          </Col>
          </Row>
      </div>
      <div id="travel-dates">
        <Row>
          <Col md="6">
            <h3>Travel Dates</h3>
          </Col>
          <Col md="6" className="trip-btn">
            <Button type="button" onClick={toggle}>+ Add</Button>
          </Col>
        </Row>
        <Row>{trips}</Row>
      </div>
    </div>
  );
};

function state2props(state) {
  return {
    form: state.travel
  };
};

export default connect(state2props)(TravelDates);
