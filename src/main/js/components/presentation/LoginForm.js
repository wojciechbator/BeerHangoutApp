import React from "react";
import {Button, Form, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router";
import {Field, reduxForm} from "redux-form";

const LoginForm = (props) => {
  const {error, handleSubmit, pristine, reset, submitting} = props;
  return (
    <Segment inverted compact>
      <Header size='medium'>Zaloguj się</Header>
      <Form inverted onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field style={{margin: 8}}
                 name='username'
                 label='Nazwa użytkownika'
                 component={username =>
                   <div>
                     <Form.Input type='text' {...username} placeholder='Nazwa użytkownika'/>
                     {username.touched && username.error && <span>{username.error}</span>}
                   </div>
                 }/>
          <Field style={{margin: 8}}
                 name='password'
                 label='Hasło'
                 component={password =>
                   <div>
                     <Form.Input type='text' {...password} placeholder='Hasło'/>
                     {password.touched && password.error && <span>{password.error}</span>}
                   </div>
                 }/>
          {error && <strong>{error}</strong>}
        </Form.Group>
        <Button type='submit' disabled={submitting}>Zaloguj</Button>
        <Button type='button' disabled={pristine || submitting} onClick={reset}>Wyczyść wartości</Button>
        <Button as={Link} to='/' color='blue'>Powrót</Button>
      </Form>
    </Segment>
  );
}

export default reduxForm({
  form: 'submitValidation'
})(LoginForm)
