import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of a hotel
export default function HotelCard({name, district, price, link, rating, image}) {
  return (
    <div className="card col-md-3 p-0">
      <img className="card-img" src={image} alt="Card image cap" />
      <div className="card-body text-center">
        <h4 className="card-title"><strong>{name}</strong></h4>
        <h6 className="card-text">{district}</h6>
        <h6 className="card-text">${price}</h6>
        <h6 className="card-text">{rating}</h6>
      </div>
      <div className="card-footer text-center">
        <a className="btn btn-info" href={link}>Book here!</a>
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
