import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';

import api from '../api';
import TripCardHeader from './TripCardHeader';
import TravelForm from './TravelForm';
import { Link } from 'react-router-dom';

// Renders the details of an individual trip as a card
function TravelCard(props) {
  // Sends a request to delete a trip
  function remove() {
    api.delete_travel_date(props.trip.id);
  }

  function search(origin, destination, passengers, sDate, eDate) {
    const start_date = props.trip.start_date
    const end_date = props.trip.end_date
    const newFrom = start_date.substring(5, 7) + "/"
      + start_date.substring(8, 10) + "/" + start_date.substring(0, 4);
    const newEnd = end_date.substring(5, 7) + "/"
      + end_date.substring(8, 10) + "/" + end_date.substring(0, 4);
    api.search_flight_by_params({
      dest: props.trip.destination,
      origin: props.trip.origin,
      date_from: newFrom,
      date_to: newEnd
    })
    props.dispatch({
      type: 'ADD_TRAVEL_CARD_INFO',
      data: {
        travelDateId: props.trip.id,
        origin,
        destination,
        start_date: {
          month: parseInt(sDate.substring(5, 7)),
          day: parseInt(sDate.substring(8, 10)),
          year: parseInt(sDate.substring(0, 4))
        },
        end_date: {
          month: parseInt(eDate.substring(5, 7)),
          day: parseInt(eDate.substring(8, 10)),
          year: parseInt(eDate.substring(0, 4))
        },
        passengers,
        user_id: localStorage.getItem('id'),
      }
    });

    // Display the flights
    $('#search-form').hide();
    $('#hotel-search-results').hide();
    $('#booked-success').hide();
    $('#flight-search-results').show();
  }

  // Toggles the edit form
  function toggle() {
    $('#trip-details-' + props.trip.id).toggle();
    $('#trip-edit-' + props.trip.id).toggle();
    // Hide any errors
    $(".form-error").hide();
  }

  // Clears and closes the edit form
  function cancel() {
    props.dispatch({
      type: 'CLEAR_TRAVEL_FORM',
    });
    toggle();
  }

  // Sends a request to update the trip with the values from the form
  function submit(ev) {
    api.edit_travel_date(props.form);
    cancel();
  }

  // Validates the form inputs
  function validate() {
    let formLeft = document.forms["travel-left-form"];
    let formRight = document.forms["travel-right-form"];
    let destination = formRight["destination"].value;
    let start = formLeft["start_date"].value;
    let end = formRight["end_date"].value;
    let origin = formLeft["origin"].value;
    let price = formLeft["price_limit"].value;
    let passengers = formRight["passengers"].value;
    let successful = true;
    let today = new Date();
    // Set today's time to midnight
    today.setHours(0, 0, 0, 0);

    // Check if the user entered a destination
    if (!destination) {
      $(".destination-error").show();
      successful = false;
    }

    // Check if the user entered an origin
    if (!origin) {
      $(".origin-error").show();
      successful = false;
    }

    // Check if the start or end dates are null
    if (!start || !end) {
      $(".start-error").show();
      $(".end-error").show();
      successful = false;
    }
    // Check if departure date is <= arrival date and that departure date is
    // no earlier than today's date
    else {
      // Add 1 day to the dates because Javascript is weird
      let startDate = new Date(start);
      startDate.setDate(startDate.getDate() + 1);
      let endDate = new Date(end);
      endDate.setDate(endDate.getDate() + 1);

      if (startDate > endDate || startDate < today) {
        $(".start-error").show();
        $(".end-error").show();
        successful = false;
      }
    }

    // Check if the price is at least 0
    if (!price || price < 0) {
      $(".price-error").show();
      successful = false;
    }
    // Check if the number of passengers is at least 1
    if (!passengers || passengers < 1) {
      $(".passengers-error").show();
      successful = false;
    }
    // Successfully validated, so submit the form
    if (successful) {
      // Hide any errors
      $(".form-error").hide();
      submit();
    }
  }

  return (
    <Col md="12">
      <Card>
        <TripCardHeader destination={props.trip.destination}
          origin={props.trip.origin} startDate={props.trip.start_date}
          endDate={props.trip.end_date} />
        <CardBody className="trip-edit" id={"trip-edit-" + props.trip.id}>
          <TravelForm form={props.form} id={props.trip.id}
            userId={props.trip.user.id} />
          <Row>
            <Col md="12" className="trip-btn">
              <Button type="button" onClick={cancel}>Cancel</Button>
              <Button type="button" onClick={validate}>Submit</Button>
            </Col>
          </Row>
        </CardBody>
        <CardBody className="trip-details" id={"trip-details-" + props.trip.id}>
          <Row>
            <Col md="6">
              <p><b>Price Limit:</b> ${props.trip.price_limit}</p>
            </Col>
            <Col md="6">
              <p><b>Number of Passengers: </b>{props.trip.passengers}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="trip-btn">
              {/* origin, destination, passengers, sDate, eDate */}
              <Link onClick={() => search(
                props.trip.origin,
                props.trip.destination,
                props.trip.passengers,
                props.trip.start_date,
                props.trip.end_date)} to="/search">
                <Button type="button">Search</Button>
              </Link>
              <Button type="button" onClick={toggle}>Edit</Button>
              <Button type="button" onClick={remove}>Delete</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

function state2props(state) {
  return {
    form: state.travel
  };
};

export default connect(state2props)(TravelCard);
