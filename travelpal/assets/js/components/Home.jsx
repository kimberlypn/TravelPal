import React from 'react';
import { connect } from 'react-redux';
import HotelCard from './HotelCard'
import api from '../api';

// Renders the home page
function Home(props) {

  return (
    <div className="page-content container-fluid">
      Home
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(Home);
