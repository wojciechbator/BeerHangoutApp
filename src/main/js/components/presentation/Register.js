import React, { Component } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';

class Register extends Component {
  render() {
    return (
      <Segment inverted>
        <Header size='medium'>Nie masz konta? Zarejestruj się</Header>
        <Form inverted>
          <Form.Group widths='equal'>
            <Form.Input label='Nazwa użytkownika' placeholder='Nazwa użytkownika' />
            <Form.Input label='e-mail' placeholder='e-mail' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Imię' placeholder='Imię' />
            <Form.Input label='Nazwisko' placeholder='Nazwisko' />
          </Form.Group>
          <Button type='submit'>Zarejestruj</Button>
        </Form>
      </Segment>
    );
  }
}

export default Register