import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default function Itinerary({flight, id}) {
  console.log(flight);

  // Converts seconds to hours, minutes, and seconds
  // Adapted from: http://jsfiddle.net/StevenIseki/apg8yx1s/
  function convertSeconds(seconds) {
    seconds = parseInt(seconds);
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds - (hrs * 3600) - (mins * 60);
    // Round seconds
    secs = Math.round(secs * 100) / 100;

    // Create an array to be returned
    let time = {
      hours: (hrs < 10 ? 0 + hrs : hrs),
      minutes: (mins < 10 ? 0 + mins : mins),
      seconds: (secs  < 10 ? 0 + secs : secs)
    };

    return time;
  }

  // Formats the duration
  function formatTime(seconds) {
    let time = convertSeconds(seconds);
    let formattedTime = time.hours + "hrs, " + time.minutes + "mins";

    return formattedTime;
  }

  // Create a list of all of the airlines
  let airlines = [];
  flight.airlines.map((aa, idx) => {
    airlines.push(<li key={idx}>{aa}</li>);
  });

  return (
    <div className="trip-itinerary" id={"trip-itinerary-" + id}>
      <Row>
        <Col md="6">
          <p><b>Origin: </b>{flight.origin}</p>
          <p className="airlines"><b>Airlines: </b></p>
          <ul>{airlines}</ul>
        </Col>
        <Col md="6">
          <p>
            <b>Round-Trip: </b>
            {formatTime(flight.duration.total)}
          </p>
          <p>
            <b>Departure: </b>
            {formatTime(flight.duration.departure)}
          </p>
          <p>
            <b>Return: </b>
            {formatTime(flight.duration.return)}
          </p>
        </Col>
      </Row>
    </div>
  );
};

Itinerary.propTypes = {
  flight: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};
