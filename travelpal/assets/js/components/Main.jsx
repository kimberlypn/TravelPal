import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Search from './Search';
import TravelDates from './TravelDates';
import PastTrips from './PastTrips';
import BookedTrips from './BookedTrips';
import Profile from './Profile';

// Renders the home page after logging in
export default function Main(props) {
  let userId = props.form.id;
  let today = new Date();
  // Grab only the travelDates for the current user
  let dates = props.travelDates.filter(tt => tt.user.id == userId);
  // Grab only the bookedTrips for the current user that have not yet passed
  let currentBooked = props.bookedTrips.filter(bb => (bb.user.id == userId) &&
    new Date(bb.end_date) >= today);
  // Grab the booked trips that have already passed
  let pastTrips = props.bookedTrips.filter(pp => (pp.user.id == userId) &&
    new Date(pp.end_date) < today);

  return (
    <React.Fragment>
      <Nav name={props.form.name} />
      <Route path="/" exact={true} render={() =>
        <Home />
      } />
      <Route path="/search" exact={true} render={() =>
        <Search />
      } />
      <Route path="/travel/dates" exact={true} render={() =>
        <TravelDates travelDates={dates} />
      } />
      <Route path="/travel/booked" exact={true} render={() =>
        <BookedTrips bookedTrips={currentBooked} form={props.bookedForm}
          flights={props.flights} hotels={props.hotels} />
      } />
      <Route path="/travel/past" exact={true} render={() =>
        <PastTrips pastTrips={pastTrips} form={props.summaryForm}
          flights={props.flights} hotels={props.hotels}
          tripSummaries={props.tripSummaries} />
      } />
      <Route path="/profile" exact={true} render={() =>
        <Profile form={props.form} friends={props.friends} />
      } />
    </React.Fragment>
  );
};
