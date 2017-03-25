import React, { Component } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {
  render() {
    return (
      <Segment inverted compact>
        <Header size='medium'>Zaloguj się</Header>
        <Form inverted onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Field style={{margin: 8}}
              type="text"
              name="username"
              component="input"
              label='Nazwa użytkownika'
              placeholder='Nazwa użytkownika' 
              />
            <Field style={{margin: 8}}
              type="password"
              name="password"
              component="input"
              label='Hasło'
              placeholder='Hasło' 
              />
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

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;