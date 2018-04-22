import React from 'react';
import PropTypes from 'prop-types';
import HotelCard from './HotelCard'
import api from '../api';

// Renders the details of a hotel
export default function Hotels(props) {
  let hotels = props.hotels.length > 0 ? _.map(props.hotels, (hh, key) => <HotelCard key={key}
    name={hh.name} district={hh.district} price={hh.price} link={hh.link} rating={hh.rating} image={hh.image_src} />)
    : <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>

  return (
    <div className="row">
      {hotels}
    </div>
  );
};
