import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import LoginForm from './login-form';

// Renders the main application; adapted from Nat's lecture notes
export default function travelpal_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Travelpal state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

let Travelpal = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Route path="/" exact={true} render={() =>
          <LoginForm login={props.login} />
        } />
      </div>
    </Router>
  );
});
