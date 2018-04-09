import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the home page
function Nav(props) {
  // Sends a request to destroy the current token
  function destroy_token() {
    props.dispatch({
      type: 'DESTROY_TOKEN'
    });
  }

  return (
    <div>
      <div class="header">
        {/* Image source: https://www.shareicon.net/transport-flight-aeroplane-airplane-airport-transportation-travel-plane-824400 */}
        <img src="images/airplane-icon.png" alt="logo" />
        <h2>TRAVELPAL</h2>
      </div>
      {/* Navbar template from: https://getbootstrap.com/docs/4.0/components/navbar/ */}
      <nav class="navbar navbar-expand-lg">
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">
              Flights <span class="sr-only">(current)</span>
            </a>
            <a class="nav-item nav-link" href="#">Weather</a>
            <a class="nav-item nav-link" href="#">Calendar</a>
            <a class="nav-item nav-link" href="#">Profile</a>
          </div>
        </div>
        <span class="navbar-text">
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
