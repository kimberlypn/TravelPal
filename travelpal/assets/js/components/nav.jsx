import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import api from '../api';

// Renders the navigation bar
function Nav(props) {
  // Sends a request to destroy the current token
  function destroy_token() {
    props.dispatch({
      type: 'DESTROY_TOKEN'
    });
  }

  return (
    <div>
      <div className="header">
        {/* Image source: https://www.shareicon.net/transport-flight-aeroplane-airplane-airport-transportation-travel-plane-824400 */}
        <img src="images/airplane-icon.png" alt="logo" />
        <h2>TRAVELPAL</h2>
      </div>
      {/* Navbar template from: https://getbootstrap.com/docs/4.0/components/navbar/ */}
      <nav className="navbar navbar-expand-lg">
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/" exact={true} activeClassName="active"
              className="nav-link">
              Flights
            </NavLink>
            <NavLink to="/weather" href="#" className="nav-link">
              Weather
            </NavLink>
            <NavLink to="/calendar" href="#" className="nav-link">
              Calendar
            </NavLink>
            <NavLink to="/profile" href="#" className="nav-link">
              Profile
            </NavLink>
          </div>
        </div>
        <span className="navbar-text">
          {props.name} |
          <a href="javascript:void(0)" onClick={destroy_token}> Log Out</a>
        </span>
      </nav>
    </div>
  );
};

function state2props(state) {
  return {
    form: state.login
  };
}

export default connect(state2props)(Nav);
