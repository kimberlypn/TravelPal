import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label, Input } from 'reactstrap';

import api from '../api';

// Renders the search page
function Search(props) {

  return (
    <div className="page-content">
      <FormGroup>
        <Label>Search</Label>
        <Input type="search" name="search" placeholder="Enter name or username" />
      </FormGroup>
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(Search);
