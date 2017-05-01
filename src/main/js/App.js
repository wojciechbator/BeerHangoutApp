import React, {Component} from "react";
import {connect} from 'react-redux';

import {transitionToLogin} from './redux/authentication/authActions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: this.props.signedIn
    }
  }
  componentWillMount() {
    // eslint-disable-next-line
    !this.props.signedIn ? this.props.dispatch(transitionToLogin()) : '';
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  signedIn: React.PropTypes.bool
};

const mapStateToProps = (store) => {
  return {
    signedIn: store.auth.signedIn
  }
};

export default connect(mapStateToProps)(App);