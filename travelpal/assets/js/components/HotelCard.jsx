import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of a hotel
export default function HotelCard({name, district, price, link, rating}) {
  return (
    <div className="card w-50 mx-auto">
      <div className="">
        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" alt="Card image cap" />
      </div>

      <div class="card-body text-center">
        <h4 class="card-title"><strong>{name}</strong></h4>
        <h6 class="font-weight-bold">{district}</h6>
        <h6 class="font-weight-bold">{price}</h6>
        <h6 class="font-weight-bold">{rating}</h6>
        <a href={link}>Book here!</a>
      </div>

    </div>
  );
};

HotelCard.propTypes = {
  name: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};
