import React from 'react';

import api from '../api';
import ProfileInfo from './ProfileInfo';
import ProfileFriends from './ProfileFriends';

// Renders the user's profile
export default function Profile(props) {
  return (
    <div className="page-content" id="profile">
      <ProfileInfo form={props.form} />
      <br />
      <ProfileFriends user={props.form.id} friends={props.friends} />
    </div>
  );
};
