import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the calendar page
function Calendar(props) {

  return (
    <div className="page-content">
      Calendar
    </div>
  );
};

function state2props(state) {
  return {

  };
}

export default connect(state2props)(Calendar);
