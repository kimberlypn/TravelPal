import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Main from './Main';

// Renders the main application
export default function travelpal_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <TravelPal state={store.getState()} />
    </Provider>,
    document.getElementById('root')
  );
};

let TravelPal = connect((state) => state)((props) => {
  // Choose what to render depending on whether or not the user is logged in
  var main;
  if (!props.form.token) {
    main = (
      <Route path="/" exact={true} render={() =>
          <LoginForm login={props.login} />
      } />
    );
  }
  else {
    main = <Main form={props.form} bookedForm={props.booked}
      friends={props.friends} travelDates={props.travelDates}
      bookedTrips={props.bookedTrips} flights={props.flights}
      hotels={props.hotels} />;
  }

  return (
    <Router>
      <React.Fragment>
        {main}
      </React.Fragment>
    </Router>
  );
});
