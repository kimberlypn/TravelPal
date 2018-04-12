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
export default function Main({form, friends, trips}) {
  let userId = form.id;
  let today = new Date();
  // Grab only the travelDates for the current user
  let userTrips = trips.filter(tt => tt.user.id == userId);
  // Grab the trips that have not yet been booked
  let travelDates = userTrips.filter(tt => !tt.booked);
  // Grab the trips that have been booked
  let bookedTrips = userTrips.filter(tt => tt.booked
    && new Date(tt.end_date) >= today);
  // Grab the trips that have already passed
  let pastTrips = userTrips.filter(tt => tt.booked &&
    new Date(tt.end_date) < today);

  return (
    <React.Fragment>
      <Nav name={form.name} />
      <Route path="/" exact={true} render={() =>
        <Home />
      } />
      <Route path="/search" exact={true} render={() =>
        <Search />
      } />
      <Route path="/travel/dates" exact={true} render={() =>
        <TravelDates travelDates={travelDates} />
      } />
      <Route path="/travel/booked" exact={true} render={() =>
        <BookedTrips bookedTrips={bookedTrips} />
      } />
      <Route path="/travel/past" exact={true} render={() =>
        <PastTrips pastTrips={pastTrips} />
      } />
      <Route path="/profile" exact={true} render={() =>
        <Profile form={form} friends={friends} />
      } />
    </React.Fragment>
  );
};

Main.propTypes = {
  form: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  trips: PropTypes.array.isRequired
};
