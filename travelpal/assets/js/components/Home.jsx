import React from 'react';
import { connect } from 'react-redux';

import api from '../api';
import FlightCard from './FlightCard';
import BookedTripInfo from './BookedTripInfo'
import HomePageTripCard from './HomePageTripCard'

// Renders the home page
function Home(props) {
  function filterFlights(flights) {
    let itineraries = new Set();
    let filteredFlights = [];
    for (let i in flights) {
      let flight = flights[i];
      let itinerary = flight.origin + flight.dest;
      if (!itineraries.has(itinerary)) {
        itineraries.add(itinerary)
        filteredFlights.push(flight)
      }
    }
    return filteredFlights;
  }

  let suggestedFlights = _.map(filterFlights(props.flights), (uu, key) =>
    <FlightCard key={key} origin={uu.origin} dest={uu.dest} dateFrom={uu.date_from}
      dateTo={uu.date_to} price={uu.price} airlines={uu.airlines} duration={uu.duration} />);
  let bookedTrips = _.map(props.bookedTrips, (bb, key) => <HomePageTripCard key={key} traveler={bb.user.name}
      destination={bb.destination} startDate={bb.start_date} endDate={bb.end_date} summary={bb.summary} hotel={bb.hotel}/>).slice(1).slice(-10);

  return (
    <div>
      <div className="page-content container">
        <h3 className="border-bottom my-3">Trips</h3>
        {bookedTrips}
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
