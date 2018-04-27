import React from 'react';
import { Row, Col } from 'reactstrap';

import api from '../api';
import FlightCard from './FlightCard';
import BookedTripInfo from './BookedTripInfo'
import HomePageTripCard from './HomePageTripCard'

// Renders the home page
export default function Home(props) {
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
    <Col md="6" key={key}>
      <FlightCard key={key} origin={uu.origin} dest={uu.dest}
      dateFrom={uu.date_from} dateTo={uu.date_to} price={uu.price}
      airlines={uu.airlines} duration={uu.duration} />
    </Col>
  );
  let bookedTrips = _.map(props.bookedTrips, (bb, key) =>
    <HomePageTripCard key={key} traveler={bb.user.name}
      destination={bb.destination} startDate={bb.start_date}
      endDate={bb.end_date} summary={bb.summary} hotel={bb.hotel}/>).slice(1).slice(-10);

  if (bookedTrips.length == 0) {
    bookedTrips = (<b>You have no friends.</b>);
  }

  let suggested = [];
  if (suggestedFlights.length == 0) {
    suggested.push(<b key={0}>No suggestions at this time.</b>);
  }
  else {
    suggested.push(<Row key={1}>{suggestedFlights}</Row>);
  }

  return (
    <div>
      <div className="page-content container home">
        <h3>Friends' Trips</h3>
        {bookedTrips}
      </div>
      <br />
      <div className="page-content container">
        <h3>Popular Flights</h3>
        {suggested}
      </div>
    </div>
  );
};
