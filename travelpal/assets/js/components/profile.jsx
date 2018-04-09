import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the user's profile
function Profile(props) {

  return (
    <div className="page-content">
      <p>Username: {props.state.username}</p>
    </div>
  );
};

function state2props(state) {
  return {

  };
}

export default connect(state2props)(Profile);
