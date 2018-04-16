import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of an individual friend
export default function FriendCard({btnTxt, name, email, username, id}) {
  // Sends an unfriend request
  function unfriend() {
    api.delete_friend(id);
  }

  // Changes the status from pending to accepted
  function accept() {
    api.accept_friend({id: id, status: "Accepted"});
  }

  let func = (btnTxt == "Accept Request") ? (() => accept()) : (() => unfriend());

  return (
    <Col md="6">
      <Card>
        <CardHeader>
          <Row>
            <Col md="6">
              {name}
            </Col>
            <Col md="6" className="friend-btn">
              <Button type="button" onClick={func}>{btnTxt}</Button>
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
  btnTxt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
