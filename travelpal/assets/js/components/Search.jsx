import React from 'react';
import PropTypes from 'prop-types';
import FlightCard from './FlightCard';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Row, Col, Button } from 'reactstrap';

import api from '../api';
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';
import HotelList from './HotelList'

// Renders the search page
export default function Search({ searchResponses, dispatch, hotels, newBookedTrip }) {
  let hotelList = searchResponses && searchResponses.length > 0 ?
  <HotelList hotels={hotels} dest={searchResponses[0].dest}
    newBookedTrip={newBookedTrip} /> :
  <div></div>

  function add_data(arrival_time, cost, departure_time, flight_id) {
    let newDeparture_time = new Date(0);
    newDeparture_time.setUTCSeconds(departure_time);

    let newArrival_time = new Date(0);
    newArrival_time.setUTCSeconds(arrival_time);
    dispatch({
      type: 'ADD_FLIGHT_DATA',
      data: {
        cost,
        flight_id,
        departure_time: {
          hour: newDeparture_time.getHours(),
          minute: newDeparture_time.getMinutes(),
          second: newDeparture_time.getSeconds()
        },
        arrival_time: {
          hour: newArrival_time.getHours(),
          minute: newArrival_time.getMinutes(),
          second: newArrival_time.getSeconds()
        },
      }
    });
  }

  let display = _.map(searchResponses, (uu, key) => {
    return (
      <Col md="6" key={key}>
        <Link key={key} onClick={() => add_data(
          uu.arrival_time,
          uu.price,
          uu.departure_time,
          uu.id
        )} to="#">
          <FlightCard
            key={key}
            origin={uu.origin}
            dest={uu.dest}
            dateFrom={uu.date_from}
            dateTo={uu.date_to}
            price={uu.price}
            airlines={uu.airlines}
            duration={uu.duration} />
        </Link>
      </Col>
    )
  });

  // Toggles the search form
  function toggleForm() {
    $('#flight-search-results').hide();
    $('#hotel-search-results').hide();
    $('#booked-success').hide();
    $('#search-form').show();
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
    let flight_id = newBookedTrip.flight_id

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
        travelDateId: newBookedTrip.travelDateId
      });

    // Display the success message
    $('#search-form').hide();
    $('#flight-search-results').hide();
    $('#hotel-search-results').hide();
    $('#booked-success').show();
  }

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

  let txt = "No Flights Available";
  // Only display the search page
  if (searchResponses == null) {
    let txt = "";
    toggleForm();
  }
  // Only display the flights
  else if (searchResponses.length > 0) {
    txt = "Flights Found";
    $('#search-form').hide();
    $('#flight-search-results').show();
  }
  // Display a message if no flights found
  else {
    let txt = "No Flights Available!";
    $('#search-form').hide();
    $('#flight-search-results').show();
  }

  return (
    <div className="page-content">
      <div id="booked-success">
        <h3>
          Succesfully booked! Go to the "Booked Trips" page to view your
          booking.
        </h3>
      </div>
      <div id="flight-search-results">
        <Row>
          <Col md="10">
            <h3>{txt}</h3>
          </Col>
          <Col md="2" className="right-btn">
            <Button type="button" onClick={toggleForm}>New Search</Button>
          </Col>
        </Row>
        <Row>
          {display}
        </Row>
      </div>
      <div id="search-form">
        <Row>
          <Col md="12">
            <h3>Search for Flights</h3>
          </Col>
        </Row>
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <SearchForm hotels={hotels} />
          </Col>
          <Col md="2"></Col>
        </Row>
      </div>
      <div id="hotel-search-results">
        <Row>
          <Col md="10">
            <h3>Hotels Found</h3>
          </Col>
          <Col md="2" className="right-btn">
            <Button type="button" className="book-trip right-btn"
              onClick={bookTrip}>
              Skip Hotel Booking
          </Button>
          </Col>
        </Row>
        <Row>
          {hotelList}
        </Row>
      </div>
    </div>
  );
};

Search.propTypes = {
  searchResponses: PropTypes.array
};
