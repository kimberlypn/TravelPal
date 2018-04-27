import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CardHeader } from 'reactstrap';
import { Row, Col } from 'reactstrap';

// Renders the card header for a trip
export default function TripCardHeader({ destination, origin, startDate, endDate }) {
  // Add 1 day to the dates because Javascript is weird
  let depart = new Date(startDate);
  depart.setDate(depart.getDate() + 1);
  let arrive = new Date(endDate);
  arrive.setDate(arrive.getDate() + 1);
  let months = ['JAN.', 'FEB.', 'MAR.', 'APR.', 'MAY', 'JUN.', 'JUL.', 'AUG',
  'SEP.', 'OCT.', 'NOV.', 'DEC.'];

  // Format the dates as 'MMM DD, YYYY'
  depart = months[depart.getMonth()] + ' ' + depart.getDate() + ', '
  + depart.getFullYear();
  arrive = months[arrive.getMonth()] + ' ' + arrive.getDate() + ', '
  + arrive.getFullYear();

  return (
    <CardHeader className="trip-card-header">
      <Row>
        <Col md="12">
          <h2>{origin.toUpperCase()}
            <span className="arrow"> G </span>
            {destination.toUpperCase()}</h2>
        </Col>
      </Row>
      <Row>
        <Col md="12">{depart} - {arrive}</Col>
      </Row>
    </CardHeader>
  );
};

TripCardHeader.propTypes = {
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};
