import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the user's past travels
function BookedTrips(props) {

  return (
    <div className="page-content">
      Booked Trips
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(BookedTrips);
