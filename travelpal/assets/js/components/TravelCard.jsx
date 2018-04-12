import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of an individual trip as a card
export default function TravelCard({destination, startDate, endDate,
  priceLimit, id}) {
  // Sends a request to delete a trip
  function cancel() {
    api.delete_travel_date(id);
  }

  // Returns the details of a trip as a Bootstrap card element
  return (
    <Col md="4">
      <Card>
        <CardHeader>
          <Row>
            <Col md="6">
              {destination}
            </Col>
            <Col md="6" className="friend-btn">
              <Button type="button" onClick={cancel}>Unbook</Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <p><b>Depart:</b> {startDate}</p>
          <p><b>Arrive:</b> {endDate}</p>
          <p><b>Price Limit:</b> ${priceLimit}</p>
        </CardBody>
      </Card>
    </Col>
  );
};

TravelCard.propTypes = {
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  priceLimit: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};
