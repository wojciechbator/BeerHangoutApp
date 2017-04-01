import React, {Component} from 'react';
import {Button, Form, Header, Segment} from 'semantic-ui-react';
import {Link} from 'react-router';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    };
    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.registerUser(this.state);
  }

  clearInput() {
    this.setState({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  render() {
    return (
      <Segment inverted>
        <Header size='medium'>Nie masz konta? Zarejestruj się</Header>
        <Form inverted onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Form.Input label='Nazwa użytkownika'
                        value={this.state.username}
                        onChange={this.onChange}
                        name="username"
                        placeholder='Nazwa użytkownika'/>
            <Form.Input label='e-mail'
                        value={this.state.email}
                        onChange={this.onChange}
                        name="email"
                        placeholder='e-mail'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Imię'
                        value={this.state.firstName}
                        onChange={this.onChange}
                        name="firstName"
                        placeholder='Imię'/>
            <Form.Input label='Nazwisko'
                        value={this.state.lastName}
                        onChange={this.onChange}
                        name="lastName"
                        placeholder='Nazwisko'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Hasło'
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        type='password'/>
            <Form.Input label='Potwierdź hasło'
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        name="passwordConfirmation"
                        type='password'/>
          </Form.Group>
          <Button color='green' type='submit'>Zarejestruj</Button>
          <Button type='button' onClick={this.clearInput}>Wyczyść wartości</Button>
          <Button as={Link} to='/' color='blue'>Powrót</Button>
        </Form>
      </Segment>
    );
  }
}

RegisterForm.propTypes = {
  registerUser: React.PropTypes.func.isRequired
}

export default RegisterForm