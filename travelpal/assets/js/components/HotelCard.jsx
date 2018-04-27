import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardImg, CardTitle, CardFooter } from 'reactstrap';
import { Button, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of a hotel
export default function HotelCard(props) {
  let name = props.name;
  let district = props.district;
  let price = props.price;
  let link = props.link;
  let rating = props.rating;
  let image = props.image;
  let hotel_id = props.id;
  let newBookedTrip = props.newBookedTrip;

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function dateObjToString(dateObj) {
    let year = dateObj.year;
    let month = dateObj.month;
    let day = dateObj.day;

    if (month <= 9) {
      month = "0" + month;
    }
    if (day <= 9) {
      day = "0" + day;
    }

    return "" + year + "-" + month + "-" + day;
  }

  function bookTrip() {
    let origin = capitalize(newBookedTrip.origin);
    let destination = capitalize(newBookedTrip.destination);
    let start_date = dateObjToString(newBookedTrip.start_date);
    let end_date = dateObjToString(newBookedTrip.end_date);
    let departure_time = newBookedTrip.departure_time;
    let arrival_time = newBookedTrip.arrival_time;
    let passengers = newBookedTrip.passengers;
    let cost = newBookedTrip.cost;
    let user_id = newBookedTrip.user_id;
    let flight_id = newBookedTrip.flight_id;

    api.create_booked_trip(
      {
        "origin": origin,
        "destination": destination,
        "start_date": start_date,
        "end_date": end_date,
        "departure_time": departure_time,
        "arrival_time": arrival_time,
        "passengers": passengers,
        "cost": cost,
        "user_id": user_id,
        "flight_id": flight_id,
        "hotel_id": hotel_id,
        travelDateId: newBookedTrip.travelDateId
      });

    // Show success message
    $('#search-form').hide();
    $('#flight-search-results').hide();
    $('#hotel-search-results').hide();
    $('#booked-success').show();
  }

  return (
    <Col md="4">
      <Card>
        <CardHeader>
          <h5>{name}</h5>
        </CardHeader>
        <CardImg src={image} alt={name}></CardImg>
        <CardBody>
          <p><b>District: </b>{district}</p>
          <p><b>Price: </b>${price.toFixed(2)} (approx.)</p>
          <p><b>Rating: </b>{rating}</p>
        </CardBody>
        <CardFooter>
          <a className="btn" href={link} target="_blank">View Listing</a>
          <Button type="button" onClick={bookTrip}>Book Hotel</Button>
          <p>
            &copy;
            <a href={link} target="_blank"> Booking.com</a>
          </p>
        </CardFooter>
      </Card>
    </Col>
  );
};
