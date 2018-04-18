import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';

import api from '../api';

// Renders the search page
export default function Search({ users, search, updateSearch }) {


  function update(ev) {
    const query = $(ev.target).val().toLowerCase();
    updateSearch(query);
  }

  return (
    <div className="page-content">
      <FormGroup>
        <Label>Search</Label>
        <Input onChange={update} value={search} type="search" name="search" placeholder="Enter name or username" />
      </FormGroup>
      <SearchResults users={users} search={search} />
    </div>
  );
};

Search.propTypes = {
};