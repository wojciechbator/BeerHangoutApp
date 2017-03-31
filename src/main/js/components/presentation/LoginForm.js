import React, {Component} from "react";
import { Form, Button } from 'semantic-ui-react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
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

  render() {
    return (
      <Form inverted onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.input style={{margin: 8}}
                      name='username'
                      value="{this.state.username}"
                      label='Nazwa użytkownika'
                      placeholder='Nazwa użytkownika'
                      onChange={this.onChange}/>
          <Form.input style={{margin: 8}}
                      name='password'
                      label='Hasło'
                      placeholder='Hasło'/>
        </Form.Group>
        <Button type='submit' disabled={submitting}>Zaloguj</Button>
        <Button type='button' onClick={this.clearInput}>Wyczyść wartości</Button>
        <Button as={Link} to='/' color='blue'>Powrót</Button>
      </Form>
    );
  };
};

export default reduxForm({
  form: 'submitValidation'
})(LoginForm)
