import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import api from '../api';
import TravelCard from './TravelCard';

// Renders the user's travel dates
export default function TravelDates({userId, travelDates}) {
  let today = new Date();
  let past = [];
  let upcoming = [];
  let future = [];

  _.map(travelDates, function(tt) {
    // Convert the start and end date strings to Date objects
    let startDate = new Date(tt.start_date);
    let endDate = new Date(tt.end_date);
    // Grab this user's trips
    if (userId == tt.user.id) {
      // TODO: Trips that have passed
      if (endDate < today) {

      }
      // Trips this month
      else if ((today.getMonth() == startDate.getMonth()) &&
      (today.getFullYear() == startDate.getFullYear())) {
        upcoming.push(<TravelCard key={tt.id} destination={tt.destination}
          startDate={tt.start_date} endDate={tt.end_date}
          priceLimit={tt.price_limit} id={tt.id} />);
      }
      // Future trips
      else {
        future.push(<TravelCard key={tt.id} destination={tt.destination}
          startDate={tt.start_date} endDate={tt.end_date}
          priceLimit={tt.price_limit} id={tt.id} />);
      }
    }
  });

  // Display none message if no upcoming or future trips
  if (upcoming.length == 0) {
    upcoming = <Col><b>You have no trips this month.</b></Col>;
  }

  if (future.length == 0) {
    future = <Col><b>You have no upcoming trips.</b></Col>;
  }

  return (
    <div className="page-content">
      <h3>Trips This Month</h3>
      <Row>{upcoming}</Row>
      <br />
      <h3>Future Trips</h3>
      <Row>{future}</Row>
    </div>
  );
};

TravelDates.propTypes = {
  userId: PropTypes.number.isRequired,
  travelDates: PropTypes.array.isRequired
};
