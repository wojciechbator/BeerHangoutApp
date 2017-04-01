import React, {Component} from "react";
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    this.setState();
  }

  clearInput() {
    this.setState({
      username: '',
      password: ''
    })
  }

  handleSubmit(event) {}

  render() {
    return (
      <Form inverted onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
                      name='username'
                      value={this.state.username}
                      label='Nazwa użytkownika'
                      placeholder='Nazwa użytkownika'
                      onChange={this.onChange}/>
          <Form.Input
                      name='password'
                      label='Hasło'
                      placeholder='Hasło'
                      onChange={this.onChange}
                      type="password"/>
        </Form.Group>
        <Button type='submit'>Zaloguj</Button>
        <Button type='button' onClick={this.clearInput}>Wyczyść wartości</Button>
        <Button as={Link} to='/' color='blue'>Powrót</Button>
      </Form>
    );
  };
}