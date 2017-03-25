import React, { Component } from 'react';
import { Message, Container, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';

import Login from '../presentation/Login';
import Register from '../presentation/Register';
import { authenticated } from '../../redux/authentication/authActions';


class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { authFailed: false };
  }

// TODO: gather usernameInput and passwordInput in sensible way, now it's undefined, either using HTMLInputElement or focus or refs
  onChange(event) {
    
  }

  handleOnSignIn(event) {
    event.preventDefault();

    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();

    if (username.length === 0) {
      return;
    }

    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    axios.post('/api/authenticate', data)
      .then(
      success => {
        this.props.dispatch(authenticated(success.data));

        const { location } = this.props;
        const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';

        this.context.router.transitionTo(nextPathname);
      },
      failure => {
        console.error(failure);
        this.setState({ authFailed: true });
      }
      );
  }

  authFailedMessage() {
    if (!this.state.authFailed) {
      return null;
    }
    return (
      <Message negative>
        <Message.Header>Błąd podczas logowania!</Message.Header>
        <p>Sprawdź, czy podałeś właściwe dane.</p>
      </Message>
    );
  }
  render() {

    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row centered>
              {this.authFailedMessage()}
              <Login onChange={this.onChange} onSubmit={this.handleOnSignIn} />
            </Grid.Row>
            <Grid.Row centered>
              <Register />
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

LoginLayout.propTypes = {
  usernameInput: HTMLInputElement,
  passwordInput: HTMLInputElement
}

export default connect(state => ({ auth: state.auth }))(LoginLayout);