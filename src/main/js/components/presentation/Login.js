import React, { Component } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.gatherUsername = this.gatherUsername.bind(this);
    this.gatherPassword = this.gatherPassword.bind(this);
    let usernameInput = null;
    let passwordInput = null;
  }

  gatherUsername() {
    this.usernameInput.focus();
  }

  gatherPassword() {
    this.passwordInput.focus();
  }

  render() {
    return (
      <Segment inverted compact>
        <Header size='medium'>Zaloguj się</Header>
        <Form inverted onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              type="text"
              name="username"
              ref={(input) => { this.usernameInput = input; }}
              label='Nazwa użytkownika'
              placeholder='Nazwa użytkownika' />
            <Form.Input
              type="password"
              name="password"
              ref={(input) => { this.passwordInput = input; }}
              label='Hasło'
              placeholder='Hasło' />
          </Form.Group>
          <Button
            type='submit'
            onClick={this.props.onSubmit.bind(this)}
          >Zaloguj</Button>
          <Button as={Link} to='/' color='blue'>Powrót</Button>
        </Form>
      </Segment>
    );
  }
}