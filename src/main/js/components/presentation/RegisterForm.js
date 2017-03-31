import React, {Component} from "react";
import {Button, Form, Header, Segment} from "semantic-ui-react";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    //TODO:
    console.log(this.state);
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
          <Button type='submit'>Zarejestruj</Button>
        </Form>
      </Segment>
    );
  }
}

export default RegisterForm