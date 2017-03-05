/* @flow */
/* eslint jsx-a11y/href-no-hash:"off" */

import React from 'react';
import { Link } from 'react-router';
import { routerContext as RouterType } from 'react-router/PropTypes';
import { connect } from 'react-redux';
import axios from 'axios';

import { loggedOut } from '../actions';

import type { Auth, Router } from '../types';

type Props = {
  auth: Auth,
  onSignOut: Function
};

type Context = {
  router: Router
}

class Navigation extends React.Component {
  props: Props;
  context: Context;

  handleSignOut() {
    axios.post('/api/signout')
      .then(
        (/* success*/) => {
          this.props.onSignOut();
          this.context.router.transitionTo('/');
        },
        failure => console.error(`Nie udało się wylogować, powód: ${failure}`)
      );
  }

  adminMenu() {
    return this.props.auth.roles.some(r => r === 'ROLE_ADMIN')
      ? (<li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >Admin <span className="caret" /></a>
        <ul className="dropdown-menu">
          <li><a href="#">Coś</a></li>
          <li><a href="#">Coś innego</a></li>
          <li><a href="#">Coś innego niż inne</a></li>
          <li role="separator" className="divider" />
          <li><a href="#">Coś odseparowanego</a></li>
        </ul>
      </li>)
      : null;
  }

  authLink() {
    if (!this.props.auth.signedIn) {
      return <Link to="/signin">Zaloguj się</Link>;
    }

    return (
      <div className="navbar-form" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <button className="btn btn-link" onClick={() => this.handleSignOut()}>Wyloguj się</button>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Przełącz pasek nawigacji</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">Wyskocz na piwko</Link>
          </div>
          <div id="navbar" className="collapse navbar-right navbar-collapse">
            <ul className="nav navbar-nav">
              {this.adminMenu()}
              <li><Link to="/">Domowa</Link></li>
              <li><Link to="/add">Dodaj komentarz</Link></li>
              <li>{this.authLink()}</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.contextTypes = {
  router: RouterType.isRequired
};

export default connect(
  state => ({ auth: state.auth }),
  dispatch => ({ onSignOut: () => dispatch(loggedOut()) })
)(Navigation);
