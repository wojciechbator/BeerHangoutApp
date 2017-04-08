import React, {Component} from "react";
import { Form, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import validate from '../utils/validateLogin';
import asyncValidate from '../utils/asyncValidate';
import { loginRequest } from '../../redux/authentication/authActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    if (username.length === 0) {
      return;
    }
    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    this.props.dispatch(loginRequest(data));
  }

  drawInput = ({ input, label, placeholder, meta: { asyncValidating, touched, error } }) => {
    return (
      <div className={asyncValidating ? 'async-validating' : ''}>
        <Form.Input label={label} placeholder={placeholder} {...input} style={{margin: 6}} />
        {touched && error && <Message negative>{error}</Message>}
      </div>
    );
  };

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <Form inverted onSubmit={handleSubmit(event => this.onSubmit(event))}>
        <Form.Group widths='equal'>
          <Field
                 name='username'
                 label='Nazwa użytkownika'
                 type='text'
                 placeholder='Podaj swój login'
                 component={this.drawInput}/>
          <Field
                 name='password'
                 label='Hasło'
                 type='password'
                 component={this.drawInput}/>
        </Form.Group>
        <Button type='submit' disabled={submitting}>Zaloguj</Button>
        <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
        <Button as={Link} to='/' color='blue'>Powrót</Button>
      </Form>
    );
  };
}

export default reduxForm({
  form: 'login',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'username', 'password' ]
})(LoginForm);