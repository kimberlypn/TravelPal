import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileLabel from './ProfileLabel';
import { Button } from 'reactstrap';

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
    // :status, :requestor_id, :acceptor_id
    function sendFriendRequest() {
        api.friend_request({ status: "Pending", requestor_id: userId, acceptor_id: currentUser.id })
    }
    let btnTxt = "Add Friend";
    let func = sendFriendRequest;
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
        }
    }

    return (
        <div className="page-content">
            <ProfileLabel label={"Name"} value={currentUser.name} />
            <ProfileLabel label={"Username"} value={currentUser.username} />
            <Button type="button" onClick={func}>{btnTxt}</Button>
        </div>
    );
};

ProfileView.propTypes = {
};
