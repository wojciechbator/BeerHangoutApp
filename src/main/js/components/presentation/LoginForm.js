import React, {Component} from "react";
import {Form, Button} from 'semantic-ui-react';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {Icon} from 'semantic-ui-react';

import validate from '../utils/validateLogin';
import {loginRequest} from '../../redux/authentication/authActions';
import styles from '../styles/styles';
import {Message} from "semantic-ui-react";

require('../../../../../node_modules/semantic-ui/dist/components/icon.min.css');

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authFailed: false,
      signedIn: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(data) {
    if (data.username.length === 0) {
      return;
    }
    const credentials = `username=${encodeURIComponent(data.username)}&password=${encodeURIComponent(data.password)}`;

    this.props.dispatch(loginRequest(credentials));
  }

  drawInput = ({input, label, placeholder, type, meta: {asyncValidating, touched, error}}) => {
    return (
      <div className={asyncValidating ? 'async-validating' : ''}>
        <Form.Input label={label} placeholder={placeholder} {...input} type={type} style={{margin: 6}}/>
        {touched && error && <p style={styles.warningPrompt}><Icon name='warning'/>{error}</p>}
      </div>
    );
  };

  render() {
    const {handleSubmit, pristine, reset, submitting, valid} = this.props;
    return (
      <div>
        {this.state.authFailed ? <Message negative>Nie istnieje użytkownik o takich danych, spróbuj jeszcze raz!</Message> : ''}
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
          <Button type='submit' disabled={submitting || !valid}>Zaloguj</Button>
          <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
          <Button as={Link} to='/register' color='blue'>Zarejestruj się</Button>
        </Form>
      </div>
    );
  };
}

export default reduxForm({
  form: 'login',
  validate,
  asyncBlurFields: ['username', 'password']
})(LoginForm);