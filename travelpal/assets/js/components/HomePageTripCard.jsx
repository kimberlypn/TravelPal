import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';

// Renders the details of a hotel
export default function HomePageTripCard({traveler, destination, startDate, endDate, summary, hotel}) {
  const hotelName = hotel ? hotel.name : ""
  const hotelImage = hotel ? hotel.image_src : ""

  function toDateReadable(date) {
    return new Date(Date.parse(date)).toDateString();
  }

  return (
    <div className="card">
      <h5 className="card-header">{toDateReadable(startDate)}  -  {toDateReadable(endDate)}</h5>
      <div className="card-body row">
        <div className="col-9">
          <p className="card-tetx">Traveler: {traveler}</p>
          <p className="card-tetx">Destination: {destination}</p>
          <p className="card-text">Summary: {summary}</p>
          <p className="card-text">Staying at: {hotelName}</p>
        </div>
        <div className="col-3">
          <img className="" src={hotelImage} alt={hotelName} />
        </div>
      </div>
    </div>
  );
};

HomePageTripCard.propTypes = {
  traveler: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};
