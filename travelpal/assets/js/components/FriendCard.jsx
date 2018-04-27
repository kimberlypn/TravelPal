import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the details of an individual friend
export default function FriendCard({btnTxt, name, email, username, id,
  anniversary}) {
  // Sends an unfriend request
  function unfriend() {
    api.delete_friend(id);
  }

  // Changes the status from pending to accepted
  function accept() {
    api.accept_friend({id: id, status: "Accepted"});
  }

  let func = (btnTxt == "Accept") ? (() => accept()) : (() => unfriend());

  let denyBtn = [];
  // Add a deny friend request button if the user is the acceptor
  if (btnTxt == "Accept") {
    denyBtn.push(
      <Button key={id} type="button" onClick={() => unfriend()}>
        Deny
      </Button>
    );
  }

  return (
    <Col md="6">
      <Card>
        <CardHeader>
          <h3>{name.toUpperCase()}</h3>
          FRIENDS SINCE {anniversary.substring(0, 4)}
        </CardHeader>
        <CardBody>
          <p><b>Username: </b>{username}</p>
          <p><b>Email: </b>{email}</p>
          <div className="right-btn">
            <Button type="button" onClick={func}>{btnTxt}</Button>
            {denyBtn}
          </div>
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
  id: PropTypes.number.isRequired,
  anniversary: PropTypes.string.isRequired
};
