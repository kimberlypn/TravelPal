import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of an individual trip as a card
export default function TravelCard(props) {
  // Sends a request to delete a trip
  function cancel() {
    api.delete_travel_date(props.id);
  }

  // Returns the details of a trip as a Bootstrap card element
  return (
    <Col md="4">
      <Card>
        <CardHeader>
          <Row>
            <Col md="6">
              {props.destination}
            </Col>
            <Col md="6" className="friend-btn">
              <Button type="button" onClick={cancel}>Unbook</Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <p><b>Depart:</b> {props.startDate}</p>
          <p><b>Arrive:</b> {props.endDate}</p>
          <p><b>Price Limit:</b> ${props.priceLimit}</p>
        </CardBody>
      </Card>
    </Col>
  );
}
