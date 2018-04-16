import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import api from '../api';
import PastCard from './PastCard';

// Renders the user's past trips
export default function PastTrips({pastTrips, form, flights, hotels,
  tripSummaries}) {
  let trips = _.map(pastTrips, function(tt) {
    var summary = null;
    _.map(tripSummaries, function(ss) {
      console.log(ss);
      if (ss.bookedtrip_id == tt.id) {
        summary = ss;
      }
    })
    return <PastCard key={tt.id} form={form} trip={tt} flights={flights}
      hotels={hotels} summary={summary} />;
  });

  // Display message if no travel dates
  if (trips.length == 0) {
    trips = <Col><b>You have not gone on any trips.</b></Col>;
  }

  return (
    <div className="page-content">
      <h3>Past Trips</h3>
      <Row>{trips}</Row>
    </div>
  );
};

PastTrips.propTypes = {
  pastTrips: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  flights: PropTypes.array.isRequired,
  hotels: PropTypes.array.isRequired,
  tripSummaries: PropTypes.array.isRequired
};
