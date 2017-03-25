import React, { Component } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

export default class Login extends Component {
  render() {
    return (
      <Segment inverted compact>
        <Header size='medium'>Zaloguj się</Header>
        <Form inverted onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              type="text"
              name="username"
              onChange={this.props.onChange}
              label='Nazwa użytkownika'
              placeholder='Nazwa użytkownika' />
            <Form.Input
              type="password"
              name="password"
              onChange={this.props.onChange}
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