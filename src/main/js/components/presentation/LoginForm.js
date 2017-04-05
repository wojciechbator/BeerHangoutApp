import React, {Component} from "react";
import { Form, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import submitValidation from '../utils/submitValidation';
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

  onSubmit(data) {
    this.props.dispatch(loginRequest(data));
  }

  drawInput = ({input, meta: { touched, error }, ...custom}) => {
    const hasError = touched && error !== undefined;
    return (
      <div>
        {hasError && <Message error header="Błąd" content={error} />}
        <Form.Input error={hasError} {...input} {...custom} style={{margin: 6}} />
      </div>
    );
  };

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <Form inverted onSubmit={handleSubmit(this.onSubmit)}>
        <Form.Group widths='equal'>
          <Field
                 name='login'
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
  submitValidation
})(LoginForm);