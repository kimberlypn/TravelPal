import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import api from '../api';
import Friend from './friend';

// Renders the user's friends
export default function ProfileFriends(props) {
  // Renders each friend's details as a card
  let friends = _.map(props.friends, function(ff) {
    if (props.user == ff.acceptor.id) {
      return <Friend key={ff.id} status={ff.status} name={ff.requestor.name}
        email={ff.requestor.email} username={ff.requestor.username} id={ff.id} />
    }
    if (props.user == ff.requestor.id) {
      return <Friend key={ff.id} status={ff.status} name={ff.acceptor.name}
        email={ff.acceptor.email} username={ff.acceptor.username} id={ff.id} />
    }
  });

  // Display "No friends" message if appropriate
  if (friends.length == 0) {
    friends = <Col><b>You have no friends.</b></Col>;
  }

  return (
    <div id="profile-friends">
      <h3>Friends</h3>
      <Row>{friends}</Row>
    </div>
  );
};
