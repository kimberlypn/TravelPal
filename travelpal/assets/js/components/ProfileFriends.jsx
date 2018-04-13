import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import api from '../api';
import FriendCard from './FriendCard';

// Renders the user's friends
export default function ProfileFriends({userId, friends}) {
  // Renders each friend's details as a card
  friends = _.map(friends, function(ff) {
    if (userId == ff.acceptor.id) {
      return <FriendCard key={ff.id} status={ff.status} name={ff.requestor.name}
        email={ff.requestor.email} username={ff.requestor.username} id={ff.id} />
    }
    if (userId == ff.requestor.id) {
      return <FriendCard key={ff.id} status={ff.status} name={ff.acceptor.name}
        email={ff.acceptor.email} username={ff.acceptor.username} id={ff.id} />
    }
  });

  let empty = true;
  // When friend is deleted, value in friends array gets set to undefined
  // rather than removed, so need to check if all values are undefined to
  // determine if the user has no friends
  _.map(friends, function(ff) {
    empty = empty && (typeof ff == 'undefined');
  });
  // Display "No friends" message if appropriate
  if (empty) {
    friends = <Col><b>You have no friends.</b></Col>;
  }

  return (
    <div id="profile-friends">
      <h3>Friends</h3>
      <Row>{friends}</Row>
    </div>
  );
};

ProfileFriends.propTypes = {
  userId: PropTypes.number.isRequired,
  friends: PropTypes.array.isRequired
};
