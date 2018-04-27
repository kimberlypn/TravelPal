import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardBody, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import api from '../api';

// Renders the details of an flight for home page
export default function FlightCard({origin, dest, dateFrom, dateTo, price, airlines}) {
  airlines = airlines.join(", ");

  // Add 1 day to the dates because Javascript is weird
  let depart = new Date(dateFrom);
  depart.setDate(depart.getDate() + 1);
  let arrive = new Date(dateTo);
  arrive.setDate(arrive.getDate() + 1);
  let months = ['JAN.', 'FEB.', 'MAR.', 'APR.', 'MAY', 'JUN.', 'JUL.', 'AUG',
  'SEP.', 'OCT.', 'NOV.', 'DEC.'];

  // Format the dates as 'MMM DD, YYYY'
  depart = months[depart.getMonth()] + ' ' + depart.getDate() + ', '
  + depart.getFullYear();
  arrive = months[arrive.getMonth()] + ' ' + arrive.getDate() + ', '
  + arrive.getFullYear();

  // Books a flight
  function book() {
    api.request_hotels({
      "location": dest,
      "start_date":dateFrom,
      "end_date":dateTo
    });

    // Hide the flights and show the hotels
    $('#flight-search-results').hide();
    $('#hotel-search-results').show();
  }

  return (
    <div className="text-center">
      <Card className="flight">
        <CardHeader className="flight-card">
          <h5>{depart} - {arrive}</h5>
        </CardHeader>
        <CardBody>
          <h5>{origin} <span className="arrow"> G </span> {dest}</h5>
          <h5>{airlines}</h5>
          <div className="right-btn">
            <a className="btn" href="/search" onClick={book}>Book</a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

FlightCard.propTypes = {
  origin: PropTypes.string.isRequired,
  dest: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  airlines: PropTypes.array.isRequired,
};
