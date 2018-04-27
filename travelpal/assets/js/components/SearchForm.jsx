import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../api';
import FlightCard from './FlightCard';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Button } from 'reactstrap';
import HotelList from './HotelList'

// Renders the search page
function SearchForm(props) {
  // Submits the values from the form
  function search(origin, destination, passengers, sDate, eDate) {
    let form = document.forms["search-form"];
    const start_date = form["start_date"].value;
    const end_date = form["end_date"].value;
    const newFrom = start_date.substring(5, 7) + "/"
      + start_date.substring(8, 10) + "/" + start_date.substring(0, 4);
    const newEnd = end_date.substring(5, 7) + "/"
      + end_date.substring(8, 10) + "/" + end_date.substring(0, 4);
    api.search_flight_by_params({
      dest: form["destination"].value,
      origin: form["origin"].value,
      date_from: newFrom,
      date_to: newEnd
    })

    props.dispatch({
      type: 'ADD_TRAVEL_CARD_INFO',
      data: {
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
  }

  // Validates the form inputs
  function validate() {
    let form = document.forms["search-form"];
    let origin = form["origin"].value;
    let destination = form["destination"].value;
    let start = form["start_date"].value;
    let end = form["end_date"].value;
    let passengers = form["passengers"].value;
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
    // Check if the number of passengers is at least 1
    if (!passengers || passengers < 1) {
      $(".passengers-error").show();
      successful = false;
    }
    // Successfully validated, so submit the form
    if (successful) {
      // Hide any errors
      $(".form-error").hide();
      search(origin, destination, passengers, start, end);
    }
  }

  return (
    <div>
      <Form name="search-form">
        <FormGroup>
          <Label for="origin"><b>Origin</b></Label>
          <Input type="text" className="form-control" name="origin"
            required="" />
          <p className="form-error origin-error">
            You must enter an origin.
          </p>
        </FormGroup>
        <FormGroup>
          <Label for="destination"><b>Destination</b></Label>
          <Input type="text" className="form-control" name="destination"
            required="" />
          <p className="form-error destination-error">
            You must enter a destination.
          </p>
        </FormGroup>
        <FormGroup>
          <Label for="start_date"><b>From Date</b></Label>
          <Input type="date" className="form-control" name="start_date"
            required="" />
          <p className="form-error start-error">
            Start date must be before or equal to end date and cannot be
            in the past.
          </p>
        </FormGroup>
        <FormGroup>
          <Label for="end_date"><b>End Date</b></Label>
          <Input type="date" className="form-control" name="end_date"
            required="" />
          <p className="form-error end-error">
            End date must be after or equal to start date.
          </p>
        </FormGroup>
        <FormGroup>
          <Label for="passengers"><b>Number of Passengers (self included)</b></Label>
          <Input type="number" className="form-control" name="passengers" min="0"
            required="" />
          <p className="form-error passengers-error">
            Number of passengers must be at least 1.
          </p>
        </FormGroup>
        <div className="right-btn">
          <Button type="button" onClick={validate}>Submit</Button>
        </div>
      </Form>
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(SearchForm);
