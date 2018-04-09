import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input } from 'reactstrap';

import api from '../api';

// Renders the log-in form; adapted from Nat's lecture notes
function LoginForm(props) {
  // Updates the state with the inputted values from the log-in form
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  // Sends a request with the values from the log-in form to create a token
  function create_token(ev) {
    api.submit_login(props.login);
  }

  return (
    <div>
      <div className="header">
        {/* Image source: https://www.shareicon.net/transport-flight-aeroplane-airplane-airport-transportation-travel-plane-824400 */}
        <img src="images/airplane-icon.png" alt="logo" />
        <h1>TRAVELPAL</h1>
      </div>
      <div className="container" id="login">
        <FormGroup>
          <Input type="text" className="form-control" name="username"
            placeholder="username" required="" autoFocus=""
            value={props.login.username} onChange={update} />
          <Input type="password" className="form-control" name="pass"
            placeholder="password" required=""
            value={props.login.password} onChange={update} />
         <Button className="btn btn-lg btn-primary btn-block"
           onClick={create_token}>
           LOG IN
         </Button>
       </FormGroup>
      </div>
    </div>
  );
};

function state2props(state) {
  return {
    form: state.login
  };
}

export default connect(state2props)(LoginForm);
