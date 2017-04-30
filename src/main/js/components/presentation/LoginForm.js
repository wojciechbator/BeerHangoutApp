import React from "react";
import {Form, Button} from 'semantic-ui-react';
import {Link} from 'react-router';
import {Field} from 'redux-form';

import {reduxForm} from 'redux-form';

import validate from '../utils/validateLogin';
import {Message} from "semantic-ui-react";

require('../../../../../node_modules/semantic-ui/dist/components/icon.min.css');

const LoginForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, valid} = props;
    return (
      <div>
        <Form inverted onSubmit={handleSubmit(props.onSubmit)}>
          <Form.Group widths='equal'>
            <Field
              name='username'
              label='Nazwa użytkownika'
              type='text'
              placeholder='Podaj swój login'
              component={props.drawInput}/>
            <Field
              name='password'
              label='Hasło'
              type='password'
              component={props.drawInput}/>
          </Form.Group>
          <Button type='submit' disabled={submitting || !valid}>Zaloguj</Button>
          <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
          <Button as={Link} to='/register' color='blue'>Zarejestruj się</Button>
        </Form>
      </div>
    );
};

export default reduxForm({
  form: 'login',
  validate,
  asyncBlurFields: ['username', 'password']
})(LoginForm);