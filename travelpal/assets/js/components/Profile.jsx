import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';
import ProfileInfo from './ProfileInfo';
import ProfileFriends from './ProfileFriends';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import SearchResults from './SearchResults';

// Renders the user's profile
export default function Profile({
  userInfo,
  friends,
  formOnChange,
  submitOnClick,
  userId,
  users,
  search,
  updateSearch
}) {
  // Updates the form with the query
  function update(ev) {
    const query = $(ev.target).val().toLowerCase();
    updateSearch(query);
  }

  function toggleDefault() {
    $("#searchFriends").show();
    $("#profileFriends").hide();
    $("#searchBtn").hide();
    $("#viewBtn").show();
  }
  function toggleReverse() {
    $("#searchFriends").hide();
    $("#profileFriends").show();
    $("#searchBtn").show();
    $("#viewBtn").hide();
  }

  const searchBtn = (
    <Button id={"searchBtn"} type="button" onClick={() => toggleDefault()}>
      Search for Friends
    </Button>
  );
  const viewBtn = (
    <Button id={"viewBtn"} type="button" onClick={() => toggleReverse()}>
      View Friends
    </Button>
  );

  const friendViewArea = (
    <div id={"profileFriends"}>
      <ProfileFriends userId={userInfo.id} friends={friends} />
    </div>
  );
  const friendSearchArea = (
    <div id={"searchFriends"} className="page-content">
      <FormGroup>
        <Label>Search for Friends</Label>
        <Input onChange={update} value={search} type="search" name="search"
          placeholder="Enter name or username" />
      </FormGroup>
      <SearchResults userId={userId} users={users} search={search} />
    </div>
  );

  return (
    <div className="page-content" id="profile">
      <ProfileInfo
        {...userInfo}
        formOnChange={formOnChange}
        submitOnClick={submitOnClick}
      />
      <br />
      {searchBtn}
      {viewBtn}
      {friendViewArea}
      {friendSearchArea}
    </div>
  );
};

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired
};
