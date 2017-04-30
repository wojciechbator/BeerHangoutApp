import React, {Component} from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {Icon} from 'semantic-ui-react';
import { registerUser } from '../../redux/users/usersActions'
import validate from '../utils/validateRegister';
import styles from '../styles/styles';

require('../../../../../node_modules/semantic-ui/dist/components/icon.min.css');

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.dispatch(registerUser(data));
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
      <Segment inverted>
        <Header size='medium'>Nie masz konta? Zarejestruj się</Header>
        <Form inverted onSubmit={handleSubmit(this.onSubmit)}>
          <Form.Group widths='equal'>
            <Field
                   name='username'
                   label='Nazwa użytkownika'
                   type='text'
                   placeholder='Nazwa użytkownika'
                   component={this.drawInput}/>
            <Field
                   name='email'
                   label='Adres e-mail'
                   type='text'
                   placeholder='Email'
                   component={this.drawInput}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
                   name='firstName'
                   label='Imię'
                   type='text'
                   placeholder='Podaj swoje imię'
                   component={this.drawInput}/>
            <Field
                   name='lastName'
                   label='Nazwisko'
                   placeholder='Tutaj nazwisko'
                   type='text'
                   component={this.drawInput}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
                   name='password'
                   label='Hasło'
                   type='password'
                   component={this.drawInput}/>
            <Field
                   name='passwordConfirmation'
                   label='Potwierdź hasło'
                   type='password'
                   component={this.drawInput}/>
          </Form.Group>
          <Button color='green' type='submit' disabled={submitting || !valid}>Zarejestruj</Button>
          <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
          <Button as={Link} to='/login' color='blue'>Zaloguj się</Button>
        </Form>
      </Segment>
    );
  }
}

RegisterForm.propTypes = {
  registerUser: React.PropTypes.func.isRequired
};

export default reduxForm({
  form: 'register',
  validate
})(RegisterForm);