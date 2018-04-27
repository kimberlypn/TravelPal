import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import HotelCard from './HotelCard'
import api from '../api';

// Renders the details of a hotel
export default function Hotels(props) {

  function filterHotels(hotels) {
    let hotelsAtLocation = []
    for (let i in hotels) {
      let id = hotels[i].id;
      if (hotels[i].result_from == props.dest.toLowerCase()) {
        hotelsAtLocation.push(hotels[i]);
      }
    }
    return hotelsAtLocation;
  }

  let hotels = props.hotels.length > 0 ?
    _.map(filterHotels(props.hotels), (hh) =>
      <HotelCard key={hh.id} id={hh.id} name={hh.name} district={hh.district}
        price={hh.price} link={hh.link} rating={hh.rating} image={hh.image_src}
        newBookedTrip={props.newBookedTrip}/>
    ) :
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>

  return (
    <Fragment>{hotels}</Fragment>
  );
};
