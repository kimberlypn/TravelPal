import React from 'react';
import { Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import ProfileLabel from './ProfileLabel';
import api from '../api';

// Renders the user's information
export default function ProfileInfo({ name, username, email, budget, formOnChange, submitOnClick }) {
  // Sends a request to update the user
  function submit(ev) {
    api.edit_user(userInfo);
  }

  // Toggles the edit input for the given field
  function toggleEdit(field) {
    $('#' + field).toggle();
    $('#' + field + '-edit').toggle();
  }

  return (
    <div id="profile-info">
      <h3>About</h3>
      <ProfileLabel name={"name"} label={"Name"} value={name} toggleEdit={toggleEdit} />
      <Row id="name-edit">
        <b>New Name:</b>
        <Input type="text" className="form-control" name="name"
          placeholder="name" required="" autoFocus=""
          value={name} onChange={formOnChange} />
        <span>
          <a href="javascript:void(0)" onClick={submitOnClick}>
            Save
          </a>
          <a href="javascript:void(0)" onClick={() => toggleEdit('name')}>
            Cancel
          </a>
        </span>
      </Row>
      <ProfileLabel name={"username"} label={"Username"} value={username} toggleEdit={toggleEdit} />
      <Row id="username-edit">
        <b>New Username:</b>
        <Input type="text" className="form-control" name="username"
          placeholder="username" required="" autoFocus=""
          value={username} onChange={formOnChange} />
        <span>
          <a href="javascript:void(0)" onClick={submitOnClick}>
            Save
          </a>
          <a href="javascript:void(0)" onClick={() => toggleEdit('username')}>
            Cancel
          </a>
        </span>
      </Row>
      <ProfileLabel name={"email"} label={"Email"} value={email} toggleEdit={toggleEdit} />
      <Row id="email-edit">
        <b>New Email:</b>
        <Input type="email" className="form-control" name="email"
          placeholder="email" required="" autoFocus=""
          value={email} onChange={formOnChange} />
        <span>
          <a href="javascript:void(0)" onClick={submitOnClick}>
            Save
          </a>
          <a href="javascript:void(0)" onClick={() => toggleEdit('email')}>
            Cancel
          </a>
        </span>
      </Row>
      <ProfileLabel name={"budget"} label={"Budget"} value={budget} toggleEdit={toggleEdit} />
      <Row id="budget-edit">
        <b>New Budget:</b>
        <Input type="number" className="form-control" name="budget"
          placeholder="budget" step="100" min="0" onChange={formOnChange} />
        <span>
          <a href="javascript:void(0)" onClick={submitOnClick}>
            Save
          </a>
          <a href="javascript:void(0)" onClick={() => toggleEdit('budget')}>
            Cancel
          </a>
        </span>
      </Row>
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
