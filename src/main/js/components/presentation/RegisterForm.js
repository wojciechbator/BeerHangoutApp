import React, {Component} from 'react';
import {Button, Form, Header, Segment, Message} from 'semantic-ui-react';
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
      passwordConfirmation: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true});
      this.props.registerUser(this.state)
        .then(
          () => {},
          ({ data }) => this.setState({ errors: data, isLoading: false })
        );
    }

  }

  isValid() {
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
    const { errors } = this.state;
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
          {/*{errors.username || errors.email && <Message error header='Ups...' content='Nazwa użytkownika lub e-mail są niepoprawne.'/>}*/}
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
          <Button disabled={this.state.isLoading} color='green' type='submit'>Zarejestruj</Button>
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