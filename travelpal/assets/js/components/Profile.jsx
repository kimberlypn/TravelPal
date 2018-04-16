import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';
import ProfileInfo from './ProfileInfo';
import ProfileFriends from './ProfileFriends';

// Renders the user's profile
export default function Profile({form, friends}) {
  return (
    <div className="page-content" id="profile">
      <ProfileInfo form={form} />
      <br />
      <ProfileFriends userId={Number(form.id)} friends={friends} />
    </div>
  );
};

Profile.propTypes = {
  form: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired
};
