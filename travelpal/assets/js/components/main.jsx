import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row } from 'reactstrap';

import Nav from './nav';

// Renders the home page
export default function Main(props) {

  return (
    <div>
      <Nav name={props.name} />
    </div>
  );
}
