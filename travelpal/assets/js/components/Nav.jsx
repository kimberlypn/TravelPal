import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem
} from 'reactstrap';
import { Nav as ReactNav } from "reactstrap";
import api from '../api';

// Renders the navigation bar
function Nav(props) {
  // Sends a request to destroy the current token
  function destroy_token() {
    props.dispatch({
      type: 'DESTROY_TOKEN'
    });
  }

  function toggle() {
    props.dispatch({
      type: 'NAV_TOGGLE',
      data: !props.isOpen
    });
  }

  return (
    <Fragment>
      <div className="header">
        {/* Image source: https://www.shareicon.net/transport-flight-aeroplane-airplane-airport-transportation-travel-plane-824400 */}
        <img src="/images/airplane-icon.png" alt="logo" />
        <h2>TRAVELPAL</h2>
      </div>
      <Navbar color="dark" dark expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={props.isOpen} navbar>
          <ReactNav navbar>
            <NavItem>
              <NavLink to="/" exact={true} activeClassName="active"
                className="nav-link" onClick={toggle}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/search" exact={true} activeClassName="active"
                className="nav-link" onClick={toggle}>
                Search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/travel/dates" href="#" className="nav-link" onClick={toggle}>
                Travel Dates
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/travel/booked" href="#" className="nav-link" onClick={toggle}>
                Booked Trips
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/travel/past" href="#" className="nav-link" onClick={toggle}>
                Past Trips
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile" href="#" className="nav-link" onClick={toggle}>
                Profile
              </NavLink>
            </NavItem>
          </ReactNav>
        </Collapse>
        <span className="navbar-text">
          <a href="javascript:void(0)" onClick={destroy_token}> Log Out</a>
        </span>
      </Navbar>
    </Fragment>
  );
};

function state2props(state) {
  return {
    form: state.login,
    isOpen: state.isOpen
  };
};

export default connect(state2props)(Nav);
