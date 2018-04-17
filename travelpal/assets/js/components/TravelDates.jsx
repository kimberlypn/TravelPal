import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import api from '../api';
import TravelCard from './TravelCard';

// Renders the user's travel dates
export default function TravelDates({travelDates}) {
  let trips = _.map(travelDates, function(tt) {
    return <TravelCard key={tt.id} trip={tt} />;
  });

  // Display none message if no travel dates
  if (trips.length == 0) {
    trips = <Col><b>You have no dates set aside for travel.</b></Col>;
  }

  // TODO: Add a create button
  return (
    <div className="page-content">
      <h3>Travel Dates</h3>
      <Row>{trips}</Row>
    </div>
  );
};

TravelDates.propTypes = {
  travelDates: PropTypes.array.isRequired
};
