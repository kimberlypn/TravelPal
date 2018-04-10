import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of an individual friend as a card
function Friend(props) {
  let btnTxt = (props.status == "Accepted") ? "Unfriend" : "Cancel Request";

  // Sends an unfriend request
  function unfriend() {
    api.delete_friend(props.id);
  }

  // Returns the friend's details as a Bootstrap card element
  return (
    <Col md="6">
      <Card>
        <CardHeader>
          <Row>
            <Col md="6">
              {props.name}
            </Col>
            <Col md="6" className="friend-btn">
              <Button type="button" onClick={unfriend}>{btnTxt}</Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div>
            <p>{props.username}</p>
            <p>{props.email}</p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

function state2props(state) {
  return {

  };
}

export default connect(state2props)(Friend);
