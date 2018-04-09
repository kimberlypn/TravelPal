import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the user's profile
function Profile(props) {

  return (
    <div className="page-content">
      <p><b>Username:</b> {props.state.username}</p>
      <p><b>Email:</b> {props.state.email}</p>
    </div>
  );
};

function state2props(state) {
  return {

  };
}

export default connect(state2props)(Profile);
