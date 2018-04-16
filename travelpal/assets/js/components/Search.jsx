import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the search page
function Search(props) {

  return (
    <div className="page-content">
      Search
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(Search);
