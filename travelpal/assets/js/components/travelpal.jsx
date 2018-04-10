import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './login-form';
import RegistrationForm from './registration-form';
import Main from './main';

// Renders the main application
export default function travelpal_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Travelpal state={store.getState()} />
    </Provider>,
    document.getElementById('root')
  );
}

let Travelpal = connect((state) => state)((props) => {
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
    main = <Main form={props.form} friends={props.friends} />;
  }

  return (
    <Router>
      <div>
        {main}
      </div>
    </Router>
  );
});
