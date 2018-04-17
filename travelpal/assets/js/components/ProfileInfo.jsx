import React from 'react';
import { Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import ProfileLabel from './ProfileLabel';
import ProfileInfoEdit from './ProfileInfoEdit';
import api from '../api';

// Renders the user's information
export default function ProfileInfo({ name, username, email, budget, formOnChange, submitOnClick }) {

  // Toggles the edit input for the given field
  function toggleEdit(field) {
    $('#' + field).toggle();
    $('#' + field + '-edit').toggle();
  }


  return (
    <div id="profile-info">
      <h3>About</h3>
      <ProfileLabel name={"name"} label={"Name"} value={name} toggleEdit={toggleEdit} />
      <ProfileLabel name={"username"} label={"Username"} value={username} toggleEdit={toggleEdit} />
      <ProfileLabel name={"email"} label={"Email"} value={email} toggleEdit={toggleEdit} />
      <ProfileLabel name={"budget"} label={"Budget"} value={budget} toggleEdit={toggleEdit} isEditDisabled={false} />
      <ProfileInfoEdit name={"budget"} label={"Budget"} inputType={"number"}
        formOnChange={formOnChange}
        submitOnClick={submitOnClick}
        toggleEdit={toggleEdit}
      />
      {/* TODO: toggle the entire input group when clicking the edit button
      and make it so that the budget input width is the same as the others'
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input type="number" className="form-control" name="budget"
          placeholder="budget" step="100" min="0" onChange={update} />
      </InputGroup>
      */}
    </div>
  );
};
