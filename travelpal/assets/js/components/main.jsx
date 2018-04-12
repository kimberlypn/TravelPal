import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import TravelDates from './TravelDates';
import PastTravels from './PastTravels';
import Profile from './Profile';

// Renders the home page after logging in
export default function Main({form, friends, travelDates}) {
  // TODO: Figure out how to route to "/profile/<user's id or username>"
  //let profilePath = "/profile/" + props.form.id;

  return (
    <React.Fragment>
      <Nav name={form.name} />
      <Route path="/" exact={true} render={() =>
        <Home />
      } />
      <Route path="/travel/dates" exact={true} render={() =>
        <TravelDates userId={form.id} travelDates={travelDates} />
      } />
      <Route path="/travel/past" exact={true} render={() =>
        <PastTravels />
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
  travelDates: PropTypes.array.isRequired
};
