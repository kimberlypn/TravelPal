import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import TravelDates from './TravelDates';
import PastTravels from './PastTravels';
import Profile from './Profile';

// Renders the home page after logging in
export default function Main(props) {
  // TODO: Figure out how to route to "/profile/<user's id or username>"
  //let profilePath = "/profile/" + props.form.id;

  return (
    <React.Fragment>
      <Nav name={props.form.name} />
      <Route path="/" exact={true} render={() =>
        <Home />
      } />
      <Route path="/travel/dates" exact={true} render={() =>
        <TravelDates user={props.form.id} travelDates={props.travelDates} />
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
