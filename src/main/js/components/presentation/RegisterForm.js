import React, {Component} from 'react';
import {Button, Form, Header, Segment, Message} from 'semantic-ui-react';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import validate from '../utils/registerValidation';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({errors: {}, isLoading: true});
    axios.post('/api/users', this.state)
      .then(
        () => {
        },
        ({data}) => this.setState({errors: data, isLoading: false})
      );
    //Dispatch redux action in the future
  }

  render() {
    const {handleSumbit, pristine, reset, submitting} = this.props;
    return (
      <Segment inverted>
        <Header size='medium'>Nie masz konta? Zarejestruj się</Header>
        <Form inverted onSubmit={handleSumbit}>
          <Form.Group widths='equal'>
            <Field style={{margin: 6}}
                   name='username'
                   label='Nazwa użytkownika'
                   component={username =>
                     <div>
                       <Form.Input
                         type='text'
                         {...username}
                         placeholder='Nazwa użytkownika'/>
                       {username.touched && username.error && <span>{username.error}</span>}
                     </div>
                   }/>
            <Field style={{margin: 6}}
                   name='email'
                   label='Adres e-mail'
                   component={email =>
                     <div>
                       <Form.Input
                         type='text'
                         {...email}
                         placeholder='Email'/>
                       {email.touched && email.error && <span>{email.error}</span>}
                     </div>
                   }/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field style={{margin: 6}}
                   name='firstName'
                   label='Imię'
                   component={firstName =>
                     <div>
                       <Form.Input
                         type='text'
                         {...firstName}
                         placeholder='Podaj swoje imię'/>
                       {firstName.touched && firstName.error && <span>{firstName.error}</span>}
                     </div>
                   }/>
            <Field style={{margin: 6}}
                   name='lastName'
                   label='Nazwisko'
                   component={lastName =>
                     <div>
                       <Form.Input
                         type='text'
                         {...lastName}
                         placeholder='Tutaj nazwisko'/>
                       {lastName.touched && lastName.error && <span>{lastName.error}</span>}
                     </div>
                   }/>
          </Form.Group>
          <Form.Group widths='equal'>
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
            <Field style={{margin: 6}}
                   name='passwordConfirmation'
                   label='Potwierdź hasło'
                   component={passwordConfirmation =>
                     <div>
                       <Form.Input
                         type='password'
                         {...passwordConfirmation}
                       />
                       {passwordConfirmation.touched && passwordConfirmation.error &&
                       <span>{passwordConfirmation.error}</span>}
                     </div>
                   }/>
          </Form.Group>
          <Button color='green' type='submit'>Zarejestruj</Button>
          <Button disabled={pristine || submitting} onClick={reset}>Wyczyść dane</Button>
          <Button as={Link} to='/' color='blue'>Powrót</Button>
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