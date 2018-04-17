import React from 'react';
import PropTypes from 'prop-types';
import { Row, Input, InputGroupAddon, InputGroup } from 'reactstrap';

export default function ProfileInfoEdit({
    name,
    value,
    label,
    inputType,
    formOnChange,
    submitOnClick,
    toggleEdit,
    prepend
}) {
    return (
        <Row id={`${name}-edit`} >
            <b>New {label}:</b>
            <InputGroup>
                <InputGroupAddon addonType="prepend">{prepend}</InputGroupAddon>
                <Input type={inputType} className="form-control" name={name}
                    placeholder={name} required="" autoFocus=""
                    value={value} onChange={formOnChange} />
            </InputGroup>
            <span>
                <a href="javascript:void(0)" onClick={() => submitOnClick(name)}>
                    Save
                </a>
                <a href="javascript:void(0)" onClick={() => toggleEdit(name)}>
                    Cancel
                </a>
            </span>
        </ Row>
    );
}

ProfileInfoEdit.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    label: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    formOnChange: PropTypes.func.isRequired,
    submitOnClick: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    prepend: PropTypes.string
};
