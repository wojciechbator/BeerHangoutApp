/* @flow */
/* eslint jsx-a11y/href-no-hash:"off" */

import React from 'react';
import { routerContext as RouterType } from 'react-router/PropTypes';


type State = {
  authFailed: boolean
};

class Sidebar extends React.Component {
  //JUST TEMP IMPLEMENTIATION
  someState: State;

  handleRefreshComments() {
    this.someState = { authFailed: true };
  }

  render() {
    return (
      <div className="slider">
        <div className="collapse">
          <h1>jakis tekst</h1>
          <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Odśwież</button>
        </div>
      </div>
    );
  }
}

Sidebar.contextTypes = {
  router: RouterType.isRequired
};

export default Sidebar;
