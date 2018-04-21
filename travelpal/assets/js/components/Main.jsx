import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Search from './Search';
import TravelDates from './TravelDates';
import PastTrips from './PastTrips';
import BookedTrips from './BookedTrips';
import Profile from './Profile';
import ProfileView from './ProfileView';
import AlertMessage from './AlertMessage';

// Renders the home page after logging in
export default function Main({ form, booked, travel, friends, travelDates,
  bookedTrips, flights, hotels, token, actions, apiCalls, users, search }) {
  let userId = form.id;
  let today = new Date();
  // Grab only the travelDates for the current user
  travelDates = travelDates.filter(tt => tt.user.id == userId);
  // Grab only the bookedTrips for the current user that have not yet passed
  let currentBooked = bookedTrips.filter(bb => (bb.user.id == userId) &&
    new Date(bb.end_date) >= today);
  // Grab the booked trips that have already passed
  let pastTrips = bookedTrips.filter(pp => (pp.user.id == userId) &&
    new Date(pp.end_date) < today);

  // TODO: Re-add flights to BookedTrips and PastTrips components
  return (
    <Fragment>
      <Nav name={form.name} />
      <AlertMessage />
      <Route path="/" exact={true} render={() =>
        <Home flights={flights}/>
      } />
      <Route path="/search" exact={true} render={() =>
        <Search />
      } />
      <Route path="/travel/dates" exact={true} render={() =>
        <TravelDates travelDates={travelDates} form={travel} userId={token.id} />
      } />
      <Route path="/travel/booked" exact={true} render={() =>
        <BookedTrips bookedTrips={currentBooked} form={booked}
          hotels={hotels} />
      } />
      <Route path="/travel/past" exact={true} render={() =>
        <PastTrips pastTrips={pastTrips} form={booked}
          hotels={hotels} />
      } />
      <Route path="/profile/:username" exact={true} render={({ match }) =>
        <ProfileView
          users={users}
          friends={friends}
          username={match.params.username}
          userId={userId}
        />
      } />
      <Route path="/profile" exact={true} render={() =>
        <Profile
          userInfo={token}
          friends={friends}
          formOnChange={actions.updateFormAction}
          submitOnClick={apiCalls.submitProfileChanges}
          userId={userId}
          users={users}
          updateSearch={actions.updateSearch}
          search={search}
        />
      } />
    </Fragment>
  );
};

Main.propTypes = {
  form: PropTypes.object.isRequired,
  booked: PropTypes.object.isRequired,
  travel: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  travelDates: PropTypes.array.isRequired,
  bookedTrips: PropTypes.array.isRequired,
  flights: PropTypes.array.isRequired,
  hotels: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired
};
