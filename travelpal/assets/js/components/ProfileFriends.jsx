import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import api from '../api';
import FriendCard from './FriendCard';

// Renders the user's friends
export default function ProfileFriends({userId, friends}) {
  // Renders each friend's details as a card
  let myFriends = _.map(friends, function(ff) {
    if (userId == ff.acceptor.id) {
      return <FriendCard key={ff.id} status={ff.status} name={ff.requestor.name}
        email={ff.requestor.email} username={ff.requestor.username} id={ff.id} />
    }
    if (userId == ff.requestor.id) {
      return <FriendCard key={ff.id} status={ff.status} name={ff.acceptor.name}
        email={ff.acceptor.email} username={ff.acceptor.username} id={ff.id} />
    }
  });

  // Display "No friends" message if appropriate
  if (myFriends.length == 0) {
    myFriends = <Col><b>You have no friends.</b></Col>;
  }

  return (
    <div id="profile-friends">
      <h3>Friends</h3>
      <Row>{myFriends}</Row>
    </div>
  );
};

ProfileFriends.propTypes = {
  userId: PropTypes.number.isRequired,
  friends: PropTypes.array.isRequired
};
