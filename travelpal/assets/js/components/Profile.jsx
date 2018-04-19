import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';
import ProfileInfo from './ProfileInfo';
import ProfileFriends from './ProfileFriends';

// Renders the user's profile
export default function Profile({ userInfo, friends, formOnChange, submitOnClick }) {
  return (
    <div className="page-content" id="profile">
      <ProfileInfo
        {...userInfo}
        formOnChange={formOnChange}
        submitOnClick={submitOnClick}
      />
      <br />
      <ProfileFriends userId={userInfo.id} friends={friends} />
    </div>
  );
};

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired
};
