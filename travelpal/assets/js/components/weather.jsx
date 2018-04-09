import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the weather page
function Weather(props) {

  return (
    <div className="page-content">
      Weather
    </div>
  );
};

function state2props(state) {
  return {

  };
}

export default connect(state2props)(Weather);
