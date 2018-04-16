import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Main from './Main';
import api from '../api';

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
    function updateFormAction(ev) {
      let tgt = $(ev.target);
      let data = {};
      data[tgt.attr('name')] = tgt.val();
      props.dispatch({
        type: 'UPDATE_FORM',
        data: data,
      });
    }
    const actions = {
      updateFormAction
    }

    function submitProfileChanges() {
      api.edit_user(props.form);
    }

    const apiCalls = {
      submitProfileChanges
    }

    main = <Main {...props} actions={actions} apiCalls={apiCalls} />;
  }

  return (
    <Router>
      <React.Fragment>
        {main}
      </React.Fragment>
    </Router>
  );
});
