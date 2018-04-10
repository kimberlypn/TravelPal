import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// Renders the flights page
function Home(props) {

  return (
    <div className="page-content">
      Home
    </div>
  );
};

function state2props(state) {
  return {

  };
}

export default connect(state2props)(Home);
