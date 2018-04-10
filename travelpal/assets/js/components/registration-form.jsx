import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import api from '../api';

// Renders the registration form
function RegistrationForm(props) {
  // Updates the state with the inputted values from the registration form
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_REGISTRATION_FORM',
      data: data,
    });
  }

  // Sends a request to create a user with the values from the forms
  function submit(ev) {
    api.create_user(props.form);
  }

  // Closes the registration form
  function cancel() {
    $("#registration").hide();
    $("#login").show();
  }

  return (
    <div>
      <div className="container" id="registration">
        <FormGroup>
          <Input type="email" className="form-control" name="email"
            placeholder="email" required="" autoFocus=""
            value={props.form.email} onChange={update} />
          <Input type="text" className="form-control" name="name"
            placeholder="full name" required=""
            value={props.form.name} onChange={update} />
          <Input type="text" className="form-control" name="username"
            placeholder="username" required=""
            value={props.form.username} onChange={update} />
          <Input type="password" className="form-control" name="password"
            placeholder="password" required=""
            value={props.form.password} onChange={update} />
          <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input placeholder="budget" type="number" step="100" min="0" />
          </InputGroup>
          <br />
         <Button className="btn btn-lg btn-primary btn-block"
           onClick={submit}>
           SUBMIT
         </Button>
         <br />
         <p><a href="javascript:void(0)"onClick={cancel}>Cancel</a></p>
       </FormGroup>
      </div>
    </div>
  );
};

function state2props(state) {
  return {
    form: state.register
  };
}

export default connect(state2props)(RegistrationForm);
