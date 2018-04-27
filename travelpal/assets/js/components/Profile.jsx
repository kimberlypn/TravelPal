import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';
import ProfileInfo from './ProfileInfo';
import ProfileFriends from './ProfileFriends';
import { FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
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

  function myToggle() {
    $("#searchFriends").toggle();
    $("#profileFriends").toggle();
    $("#searchBtn").toggle();
    $("#viewBtn").toggle();
  }

  const viewBtn = (
    <Button id={"viewBtn"} type="button" onClick={() => myToggle()}>
      View Friends
    </Button>
  );

  const friendViewArea = (
    <div id={"profileFriends"} className="page-content">
      <ProfileFriends userId={userInfo.id} friends={friends} myToggle={myToggle} />
    </div>
  );
  const friendSearchArea = (
    <div id={"searchFriends"} className="page-content">
      <Row md="12">
        <Col md="6">
          <h3>Search for Friends</h3>
        </Col>
        <Col md="6">
          <div className="right-btn">
            {viewBtn}
          </div>
        </Col>
      </Row>
      <br />
      <FormGroup>
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
      {friendViewArea}
      {friendSearchArea}
    </div>
  );
};

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired
};
