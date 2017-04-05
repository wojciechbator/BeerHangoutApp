import React, {Component} from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import { registerUser } from '../../redux/users/usersActions'
import validateRegister from '../utils/registerValidation';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.dispatch(registerUser(data));
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <Segment inverted>
        <Header size='medium'>Nie masz konta? Zarejestruj się</Header>
        <Form inverted onSubmit={handleSubmit(this.onSubmit)}>
          <Form.Group widths='equal'>
            <Field
                   name='username'
                   label='Nazwa użytkownika'
                   type='text'
                   placeholder='Nazwa użytkownika'
                   component={drawInput}/>
            <Field
                   name='email'
                   label='Adres e-mail'
                   type='text'
                   placeholder='Email'
                   component={drawInput}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
                   name='firstName'
                   label='Imię'
                   type='text'
                   placeholder='Podaj swoje imię'
                   component={drawInput}/>
            <Field
                   name='lastName'
                   label='Nazwisko'
                   placeholder='Tutaj nazwisko'
                   type='text'
                   component={drawInput}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
                   name='password'
                   label='Hasło'
                   type='password'
                   component={drawInput}/>
            <Field
                   name='passwordConfirmation'
                   label='Potwierdź hasło'
                   type='password'
                   component={drawInput}/>
          </Form.Group>
          <Button color='green' type='submit' disabled={submitting}>Zarejestruj</Button>
          <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
          <Button as={Link} to='/' color='blue'>Powrót</Button>
        </Form>
      </Segment>
    );
  }
}

const drawInput = inputData => {
  return (
    <div>
      <Form.Input {...inputData.input} style={{margin: 6}} placeholder={inputData.input.placeholder} label={inputData.input.label} type={inputData.input.type}/>
      {inputData.touched && inputData.error && <Message error={inputData.error}>Ups</Message>}
    </div>
  );
};

RegisterForm.propTypes = {
  registerUser: React.PropTypes.func.isRequired
};

export default reduxForm({
  form: 'register',
  validateRegister
})(RegisterForm);