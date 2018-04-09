import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import api from '../api';

// Renders the navigation bar; adapted from Nat's lecture notes
let LoginForm = connect(({login}) => {return {login};})((props) => {
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
    <div className="navbar-text">
      <Form inline>
        <FormGroup>
          <Input type="text" name="username" placeholder="username"
            value={props.login.username} onChange={update} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="pass" placeholder="password"
            value={props.login.pass} onChange={update} />
        </FormGroup>
        <Button onClick={create_token}>Log In</Button>
      </Form>
    </div>
  );
});

// Displays the user's name in the top right
let Session = connect(({token}) => {return {token};})((props) => {
  // Sends a request to destroy the current token
  function destroy_token() {
    props.dispatch({
      type: 'DESTROY_TOKEN'
    });
  }

  return (
    <div className="navbar-text">
      {props.token.user_name} (ID: {props.token.user_id})
      <span>|</span>
      <a href="javascript:void(0)" onClick={destroy_token}>Log Out</a>
    </div>
  );
});

// Displays either the user's name or the log-in form
function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Task Tracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active"
            className="nav-link">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/tasks" href="#"
            className="nav-link">New Task
          </NavLink>
        </NavItem>
      </ul>
      {session_info}
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
