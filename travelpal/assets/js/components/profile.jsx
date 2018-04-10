import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import api from '../api';

// Renders the user's profile
function Profile(props) {
  // Updates the state with the edited values
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_FORM',
      data: data,
    });
  }

  // Sends a request to update the task
  function submit(ev) {
    api.edit_user(props.state);
  }

  // Toggles the edit input for the given field
  function toggleEdit(field) {
    $('#' + field).toggle();
    $('#' + field + '-edit').toggle();
  }

  return (
    <div className="page-content" id="profile">
      <p id="username">
        <b>Username:</b> {props.state.username}
        <a href="javascript:void(0)" onClick={() => toggleEdit('username')}>
          <img src="images/edit.png" alt="edit-username" />
        </a>
      </p>
      <Row id="username-edit">
        <b>New Username:</b>
        <Input type="text" className="form-control" name="username"
          placeholder="username" required="" autoFocus=""
          value={props.state.username} onChange={update} />
        <span>
          <a href="javascript:void(0)" onClick={submit}>
            Submit
          </a>
          <a href="javascript:void(0)" onClick={() => toggleEdit('username')}>
            Cancel
          </a>
        </span>
      </Row>
      <p id="email">
        <b>Email:</b> {props.state.email}
        <a href="javascript:void(0)" onClick={() => toggleEdit('email')}>
          <img src="images/edit.png" alt="edit-username" />
        </a>
      </p>
      <Row id="email-edit">
        <b>New Email:</b>
        <Input type="email" className="form-control" name="email"
          placeholder="email" required="" autoFocus=""
          value={props.state.email} onChange={update} />
        <span>
          <a href="javascript:void(0)" onClick={submit}>
            Submit
          </a>
          <a href="javascript:void(0)" onClick={() => toggleEdit('email')}>
            Cancel
          </a>
        </span>
      </Row>
      <p id="budget">
        <b>Budget:</b> ${props.state.budget}
        <a href="javascript:void(0)" onClick={() => toggleEdit('budget')}>
          <img src="images/edit.png" alt="edit-username" />
        </a>
      </p>
      <Row id="budget-edit">
        <b>New Budget:</b>
        <Input type="number" className="form-control" name="budget"
          placeholder="budget" step="100" min="0" onChange={update} />
        <span>
          <a href="javascript:void(0)" onClick={() => toggleEdit('budget')}>
            Submit
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

function state2props(state) {
  return {
    form: state.form
  };
}

export default connect(state2props)(Profile);
