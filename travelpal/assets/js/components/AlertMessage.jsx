import React, { Fragment } from 'react';
import { connect } from 'react-redux';

function AlertMessage({ alertMessage, dispatch }) {
    function clearAlert() {
        dispatch({
            type: 'CLEAR_ALERT',
        });
    }
    return (
        alertMessage
            ? <div className="row">
                <div className="alert alert-danger w-100" role="alert">
                    <span>
                        {alertMessage}
                    </span>
                    <button onClick={clearAlert} type="button" className="close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            : null
    )
}

function state2props(state) {
    return {
        alertMessage: state.alertMessage
    };
};

export default connect(state2props)(AlertMessage);
