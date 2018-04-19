import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileLabel from './ProfileLabel';
import { Button, Row, Col } from 'reactstrap';

import api from '../api';

// Renders the user's profile
export default function ProfileView({ users, friends, username, userId }) {
  const currentUser = _.find(users, (u) => {
    return u.username === username
  });

  const friendRecord = _.find(friends, (f) => {
    return (
      (f.acceptor.id == currentUser.id && f.requestor.id == userId)
      || (f.acceptor.id == userId && f.requestor.id == currentUser.id)
    );
  });

  // Sends a friend request
  function sendFriendRequest() {
    api.friend_request({
      status: "Pending",
      requestor_id: userId,
      acceptor_id: currentUser.id
    })
  }

  // Determines what button to display and the functionality for that button
  let btnTxt = "Add Friend";
  let func = sendFriendRequest;
  let denyBtn = [];
  if (friendRecord) {
    if (friendRecord.status == "Accepted") {
      btnTxt = "Unfriend";
      func = () => api.delete_friend(friendRecord.id);
    } else if (friendRecord.requestor.id == userId) {
      btnTxt = "Cancel Request";
      func = () => api.delete_friend(friendRecord.id);
    } else {
      btnTxt = "Accept Request";
      func = () => api.accept_friend({ id: friendRecord.id, status: "Accepted" });
      denyBtn.push(
        <Button type="button" onClick={() => api.delete_friend(friendRecord.id)}>
          Deny Request
        </Button>
      )
    }
  }

  return (
    <div className="page-content">
      <Row>
        <Col md="12">
          <ProfileLabel label={"Name"} value={currentUser.name} />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <ProfileLabel label={"Username"} value={currentUser.username} />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Button type="button" onClick={func}>{btnTxt}</Button>
        </Col>
        <Col md="6">
          {denyBtn}
        </Col>
      </Row>
    </div>
  );
};

ProfileView.propTypes = {
};
