import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import SearchResults from './SearchResults';

import api from '../api';

// Renders the search page
export default function Search({ users, search, updateSearch }) {

  // Updates the form with the query
  function update(ev) {
    const query = $(ev.target).val().toLowerCase();
    updateSearch(query);
  }

  return (
    <div className="page-content">
      <FormGroup>
        <Label>Search for Friends</Label>
        <Input onChange={update} value={search} type="search" name="search"
          placeholder="Enter name or username" />
      </FormGroup>
      <SearchResults users={users} search={search} />
    </div>
  );
};

Search.propTypes = {
  users: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired
};
