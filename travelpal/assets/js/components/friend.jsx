import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of an individual friend as a card
export default function Friend(props) {
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
          <p>{props.username}</p>
          <p>{props.email}</p>
        </CardBody>
      </Card>
    </Col>
  );
}
