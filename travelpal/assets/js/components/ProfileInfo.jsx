import React from 'react';

import api from '../api';
import ProfileLabel from './ProfileLabel';
import ProfileInfoEdit from './ProfileInfoEdit';

// Renders the user's information
export default function ProfileInfo({ name, username, email, budget,
  formOnChange, submitOnClick }) {

  // Toggles the edit input for the given field
  function toggleEdit(field) {
    $('#' + field).toggle();
    $('#' + field + '-edit').toggle();
  }

  return (
    <div id="profile-info">
      <h3>About</h3>
      <ProfileLabel name={"name"} label={"Name"} value={name}
        toggleEdit={toggleEdit} isEditDisabled={false} />
      <ProfileInfoEdit name={"name"} label={"Name"} inputType={"text"}
        formOnChange={formOnChange}
        submitOnClick={submitOnClick}
        toggleEdit={toggleEdit}
      />
      <ProfileLabel name={"username"} label={"Username"} value={username} />
      <ProfileLabel name={"email"} label={"Email"} value={email} />
      <ProfileLabel name={"budget"} label={"Budget"} value={budget}
        toggleEdit={toggleEdit} isEditDisabled={false} />
      <ProfileInfoEdit name={"budget"} label={"Budget"} inputType={"number"}
        prepend={"$"}
        formOnChange={formOnChange}
        submitOnClick={submitOnClick}
        toggleEdit={toggleEdit}
      />
    </div>
  );
};
