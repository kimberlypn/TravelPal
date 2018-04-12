import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import api from '../api';
import TravelCard from './TravelCard';

// Renders the user's travel dates
export default function TravelDates(props) {
  let today = new Date();
  let past = [];
  let upcoming = [];
  let future = [];

  _.map(props.travelDates, function(tt) {
    // Convert the start and end date strings to Date objects
    let startDate = new Date(tt.start_date);
    let endDate = new Date(tt.end_date);
    // Grab this user's trips
    if (props.user == tt.user.id) {
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
