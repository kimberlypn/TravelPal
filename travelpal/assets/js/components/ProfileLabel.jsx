import React from 'react';
import PropTypes from 'prop-types';
export default function ProfileLabel({ name, label, value }) {
    return (
        <p id={name}>
            <b>{label}:</b> {value}
            <a href="javascript:void(0)" onClick={() => toggleEdit({ name })}>
                <img src="images/edit.png" alt={`edit-${name}`} />
            </a>
        </p>
    );
}

ProfileLabel.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};