import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import { FormGroup, Input, Label } from 'reactstrap';

import api from '../api';

// Renders the edit form for a past trip
function PastForm(props) {

  // Updates the state with the inputted values from the form
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    // Populate the fields that should not change
    data["id"] = props.id;
    props.dispatch({
      type: 'UPDATED_SUMMARY_FORM',
      data: data,
    });
  }

  return (
      <Row>
        <Col md="12">
          <FormGroup>
            <Label for="summary"><b>Trip Summary</b></Label>
            <Input type="textarea" className="form-control" name="summary"
              required="" value={props.form.summary} onChange={update} />
          </FormGroup>
        </Col>
      </Row>
  );
};

function state2props(state) {
  return {
    form: state.summary
  };
};

export default connect(state2props)(PastForm);
