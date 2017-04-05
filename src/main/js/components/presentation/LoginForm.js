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
          <Field
                 name='login'
                 label='Nazwa użytkownika'
                 type='text'
                 placeholder='Podaj swój login'
                 component={drawInput}/>
          <Field
                 name='password'
                 label='Hasło'
                 type='password'
                 component={drawInput}/>
        </Form.Group>
        <Button type='submit' disabled={submitting}>Zaloguj</Button>
        <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
        <Button as={Link} to='/' color='blue'>Powrót</Button>
      </Form>
    );
  };
}

const drawInput = inputData => {
  return (
    <div>
      <Form.Input {...inputData.input} style={{margin: 6}} placeholder={inputData.input.placeholder} label={inputData.input.label} type={inputData.input.type}/>
      {inputData.touched && inputData.error && <Message error={inputData.error}>Ups</Message>}
    </div>
  );
};

export default reduxForm({
  form: 'login',
  submitValidation,
  asyncBlurFields: [ 'login', 'password' ]
})(LoginForm);