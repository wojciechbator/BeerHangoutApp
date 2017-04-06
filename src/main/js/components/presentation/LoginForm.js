import React, {Component} from "react";
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import submitValidation from '../utils/submitValidation';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const {handleSumbit, pristine, reset, submitting} = this.props;
    return (
      <Form inverted onSubmit={handleSumbit}>
        <Form.Group widths='equal'>
          <Field style={{margin: 6}}
                 name='login'
                 label='Nazwa użytkownika'
                 component={login =>
                   <div>
                     <Form.Input
                       type='text'
                       {...login}
                     />
                     {login.touched && login.error && <span>{login.error}</span>}
                   </div>
                 }/>
          <Field style={{margin: 6}}
                 name='password'
                 label='Hasło'
                 component={password =>
                   <div>
                     <Form.Input
                       type='password'
                       {...password}
                     />
                     {password.touched && password.error && <span>{password.error}</span>}
                   </div>
                 }/>
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
  submitValidation,
  asyncBlurFields: [ 'login', 'password' ]
})(LoginForm);