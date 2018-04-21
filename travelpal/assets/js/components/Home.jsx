import React from 'react';
import { connect } from 'react-redux';

import api from '../api';
import FlightCard from './FlightCard';

// Renders the home page
function Home(props) {
  console.log("---------")
  console.log(props.flights)
  console.log("---------")

  let suggestedFlights = _.map(props.flights, (uu, key) =>
    <FlightCard key={key} origin={uu.origin} dest={uu.dest} dateFrom={uu.date_from}
      dateTo={uu.date_to} price={uu.price} airlines={uu.airlines} duration={uu.duration} />);

  return (
    <div>
      <div className="container p-5">
        Trips
      </div>

      <div className="page-content container">
        <h3 className="border-bottom my-3">Popular flights</h3>
        <div className="row">
          {suggestedFlights}
        </div>
      </div>
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(Home);
