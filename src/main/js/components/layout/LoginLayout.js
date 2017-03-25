import React, { Component } from 'react';
import { Header, Button, Form, Container, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {

    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row centered>
              <Segment inverted compact>
                <Header size='medium'>Zaloguj się</Header>
                <Form inverted onSubmit={this.onSubmit}>
                  <Form.Group widths='equal'>
                    <Form.Input
                      type="text"
                      name="username"
                      onChange={this.onChange}
                      label='Nazwa użytkownika'
                      placeholder='Nazwa użytkownika' />
                    <Form.Input
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      label='Hasło'
                      placeholder='Hasło' />
                  </Form.Group>
                  <Button
                    type='submit'
                    onClick={this
                      .onSubmit
                      .bind(this)}
                  >Zaloguj</Button>
                  <Button as={Link} to='/' color='blue'>Powrót</Button>
                </Form>
              </Segment>
            </Grid.Row>
            <Grid.Row centered>
              <Segment inverted>
                <Header size='medium'>Nie masz konta? Zarejestruj się</Header>
                <Form inverted>
                  <Form.Group widths='equal'>
                    <Form.Input label='Nazwa użytkownika' placeholder='Nazwa użytkownika' />
                    <Form.Input label='e-mail' placeholder='e-mail' />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input label='Imię' placeholder='Imię' />
                    <Form.Input label='Nazwisko' placeholder='Nazwisko' />
                  </Form.Group>
                  <Button type='submit'>Zarejestruj</Button>
                </Form>
              </Segment>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default LoginLayout