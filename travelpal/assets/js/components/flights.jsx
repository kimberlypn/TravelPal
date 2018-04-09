import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the flights page
function Flights(props) {

  return (
    <div className="page-content">
      Flights
    </div>
  );
};

function state2props(state) {
  return {

  };
}

export default connect(state2props)(Flights);
