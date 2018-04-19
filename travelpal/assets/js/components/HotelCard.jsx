import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';

// Renders the details of a hotel
export default function HotelCard({name, district, price, link, rating, image}) {
  return (
    <div className="card col-md-3 p-0 list-group text-center mx-3">
      <img className="card-img list-group-item border-0 orange" src={image} alt={name} />
      <div className="card-body list-group-item">
        <h4 className="card-title"><strong>{name}</strong></h4>
        <h6 className="card-text">{district}</h6>
        <h6 className="card-text"> ~${price}</h6>
        <h6 className="card-text">Rating: {rating}</h6>
      </div>
      <div className="card-footer list-group-item">
        <a className="btn btn-info" href={link}>Book Here</a>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  name: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};
