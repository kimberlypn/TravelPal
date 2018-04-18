import React, { Fragment } from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function SearchResults({ users, search }) {
    let fullMatch = [];
    let begMatch = [];
    let partialMatch = [];

    function makeUserLink(user) {
        return (
            <Row key={user.id}>
                <Link to={`/profile/${user.username}`}>
                    {user.name}
                </Link>
            </Row>
        );
    }
    const query = search.toLowerCase();
    if (query == null || query == "") {
        let fullMatch = [];
        let begMatch = [];
        let partialMatch = [];
        return null;
    }

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
};