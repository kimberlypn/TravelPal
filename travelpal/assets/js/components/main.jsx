import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Home from './home';
import TravelDates from './travel-dates';
import PastTravels from './past-travels';
import Profile from './profile';

// Renders the home page after logging in
export default function Main(props) {
  return (
    <React.Fragment>
      <Nav name={props.form.name} />
      <Route path="/" exact={true} render={() =>
        <Home />
      } />
      <Route path="/travel/dates" exact={true} render={() =>
        <TravelDates />
      } />
      <Route path="/travel/past" exact={true} render={() =>
        <PastTravels />
      } />
      <Route path="/profile" exact={true} render={() =>
        <Profile form={props.form} friends={props.friends} />
      } />
    </React.Fragment>
  );
}
