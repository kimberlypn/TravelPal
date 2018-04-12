import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of an individual friend
export default function FriendCard({status, name, email, username, id}) {
  let btnTxt = (status == "Accepted") ? "Unfriend" : "Cancel Request";

  // Sends an unfriend request
  function unfriend() {
    api.delete_friend(id);
  }

  return (
    <Col md="6">
      <Card>
        <CardHeader>
          <Row>
            <Col md="6">
              {name}
            </Col>
            <Col md="6" className="friend-btn">
              <Button type="button" onClick={unfriend}>{btnTxt}</Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <p><b>Username: </b>{username}</p>
          <p><b>Email: </b>{email}</p>
        </CardBody>
      </Card>
    </Col>
  );
};

FriendCard.propTypes = {
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
