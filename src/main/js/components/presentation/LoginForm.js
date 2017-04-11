import React, {Component} from "react";
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import validate from '../utils/validateLogin';
import { loginRequest } from '../../redux/authentication/authActions';
import styles from '../styles/styles';

require('../../../../../node_modules/semantic-ui/dist/components/icon.min.css');

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
    //TODO: add csrf token in header!
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    if (username.length === 0) {
      return;
    }
    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    this.props.dispatch(loginRequest(data));
  }

  drawInput = ({ input, label, placeholder, type, meta: { asyncValidating, touched, error } }) => {
    return (
      <div className={asyncValidating ? 'async-validating' : ''}>
        <Form.Input label={label} placeholder={placeholder} {...input} type={type} style={{margin: 6}} />
        {touched && error && <p style={styles.warningPrompt}><Icon name='warning'/>{error}</p>}
      </div>
    );
  };
  render() {
    const {handleSubmit, pristine, reset, submitting, valid} = this.props;
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
        <Button type='submit' disabled={submitting || !valid}>Zaloguj</Button>
        <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
        <Button as={Link} to='/' color='blue'>Powrót</Button>
      </Form>
    );
  };
}

export default reduxForm({
  form: 'login',
  validate,
  asyncBlurFields: [ 'username', 'password' ]
})(LoginForm);