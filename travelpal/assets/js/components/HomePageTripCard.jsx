import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';

// Renders the details of a hotel
export default function HomePageTripCard({destination, startDate, endDate, summary, hotel}) {
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
          <p className="card-tetx">Destination: {destination}</p>
          <p className="card-text">Summary: {summary}</p>
          <p className="card-text">Staying at: {hotelName}</p>
        </div>
        <div className="col-3">
          <img className="" src={"https://q-fa.bstatic.com/xdata/images/hotel/square200/66399746.jpg?k=cc2d685e65b4f64cd7c8bb539b00cd7d24518b86742da3eeb8c76589bdb58211&o="} alt={name} />
        </div>
      </div>
    </div>
  );
};

HomePageTripCard.propTypes = {
};
