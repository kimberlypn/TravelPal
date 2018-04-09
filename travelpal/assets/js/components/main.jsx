import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Flights from './flights';
import Weather from './weather';
import Calendar from './calendar';
import Profile from './profile';

// Renders the home page
export default function Main(props) {

  return (
    <div>
      <Nav name={props.state.name} />
      <Route path="/" exact={true} render={() =>
        <Flights />
      } />
      <Route path="/weather" exact={true} render={() =>
        <Weather />
      } />
      <Route path="/calendar" exact={true} render={() =>
        <Calendar />
      } />
      <Route path="/profile" exact={true} render={() =>
        <Profile state={props.state} />
      } />
    </div>
  );
}
