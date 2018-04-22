import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardImg, CardHeader, Button, Row, Col } from 'reactstrap';

// Renders the details of an flight for home page
export default function FlightCard({origin, dest, dateFrom, dateTo, price, airlines}) {
  airlines = airlines.join(", ");
  return (
    <div className="col-md-4 text-center">
      <div className="card flight">
          <h5 className="card-header flight-card">{dateFrom} ~ {dateTo}</h5>
          <div className="card-body">
            <h5 className="card-text">{airlines}</h5>
            <h5 className="card-text">{origin} - {dest}</h5>
            <p>${price}</p>
          </div>
      </div>
    </div>
  );
};

FlightCard.propTypes = {
  origin: PropTypes.string.isRequired,
  dest: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  airlines: PropTypes.array.isRequired,
};
