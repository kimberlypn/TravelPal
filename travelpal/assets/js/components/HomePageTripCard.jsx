import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of a hotel
export default function HomePageTripCard({traveler, destination, startDate,
  endDate, summary, hotel}) {
  const hotelName = hotel ? hotel.name : ""
  const hotelImage = hotel ? hotel.image_src : ""

  function toDateReadable(date) {
    return new Date(Date.parse(date)).toDateString();
  }

  // Decide what text to display
  let fly = "is flying to";
  let accomodation = "Staying at: ";
  let today = new Date();
  let start = new Date(startDate);
  start.setDate(start.getDate() + 1);
  if (start > today) {
    fly = "flew to";
    accomodation = "Stayed at: ";
  }

  // <div className="card">
  //    <h5 className="card-header">{toDateReadable(startDate)}  -  {toDateReadable(endDate)}</h5>
  //    <div className="card-body row">
  //      <div className="col-9">
  //        <p className="card-tetx">Traveler: {traveler}</p>
  //        <p className="card-tetx">Destination: {destination}</p>
  //        <p className="card-text">Summary: {summary}</p>
  //        <p className="card-text">Staying at: {hotelName}</p>
  //      </div>
  //      <div className="col-3">
  //        <img className="" src={hotelImage} alt={hotelName} />
  //      </div>
  //    </div>
  //  </div>

  return (
    <Card>
      <CardHeader>
        <Row>
          <Col md="12">
            <h4>{traveler} {fly} {destination}!</h4>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="9">
            <p><b>Departure Date: </b>{toDateReadable(startDate)}</p>
            <p><b>Return Date: </b>{toDateReadable(endDate)}</p>
            <p><b>{accomodation}</b>{hotelName}</p>
            <p><b>Trip Summary: </b>{summary}</p>
          </Col>
          <Col md="3">
            <img className="" src={hotelImage} alt={hotelName} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

HomePageTripCard.propTypes = {
  traveler: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};
