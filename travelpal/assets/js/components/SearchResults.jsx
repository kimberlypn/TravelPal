import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

// Returns the query results of searching for friends
export default function SearchResults({ users, search }) {
  let fullMatch = [];
  let begMatch = [];
  let partialMatch = [];

  // Creates a link to the user's profile
  function makeUserLink(user) {
    return (
      <Row key={user.id}>
        <Col md="12">
          <Link to={`/profile/${user.username}`}>
            {user.name}
          </Link>
        </Col>
      </Row>
    );
  }

  // Determines if the query results are a full match, a partial match to the
  // beginning, or a match to some part of the name/username
  const query = search.toLowerCase();
  if (query == null || query == "") {
    let fullMatch = [];
    let begMatch = [];
    let partialMatch = [];
    return null;
  }

  // Builds the arrays accordingly
  const qLen = query.length;
  _.each(users, (u) => {
    const name = u.name.toLowerCase();
    const username = u.username.toLowerCase();
    if (name == query || username == query) {
      fullMatch.push(makeUserLink(u));
    } else if (qLen < name.length && name.substring(0, qLen) == query) {
      begMatch.push(makeUserLink(u));
    } else if (qLen < username.length && username.substring(0, qLen) == query) {
      begMatch.push(makeUserLink(u));
    } else if (name.includes(query) || username.includes(query)) {
      partialMatch.push(makeUserLink(u));
    }
  });

  return (
    <Fragment>
      {fullMatch}
      {begMatch}
      {partialMatch}
    </Fragment>
  );
};

SearchResults.propTypes = {
  users: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired
};
