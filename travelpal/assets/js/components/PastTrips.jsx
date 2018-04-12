import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the user's past travels
function PastTrips(props) {

  return (
    <div className="page-content">
      Past Trips
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(PastTrips);
