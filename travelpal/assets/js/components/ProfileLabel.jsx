import React from 'react';
import PropTypes from 'prop-types';

// Renders the label for the profile edit form
export default function ProfileLabel({ name, label, value, toggleEdit,
  isEditDisabled }) {
  // Renders the edit button
  const edit = (
    <a href="javascript:void(0)" onClick={() => toggleEdit(name)}>
      <img src="images/edit.png" alt={`edit-${name}`} />
    </a>
  );

  return (
    <p id={name}>
      <b>{label}:</b> {value}
      {isEditDisabled ? null : edit}
    </p>
  );
};

ProfileLabel.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  toggleEdit: PropTypes.func,
  isEditDisabled: PropTypes.bool
};

ProfileLabel.defaultProps = {
  isEditDisabled: true
};
