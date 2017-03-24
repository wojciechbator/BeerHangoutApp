import React, { Component } from 'react';
import { Button, Form, Container, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <Container >
        <Grid>
          <Grid.Row centered>
            <Segment inverted>
              <Form>
                <Form.Field>
                  <label>Login</label>
                  <input placeholder='login' />
                </Form.Field>
                <Form.Field>
                  <label>Hasło</label>
                  <input placeholder='haslo' />
                </Form.Field>
                <Button type='submit'>Zaloguj</Button>
                <Button as={Link} to='/' color='blue'>Powrót</Button>
              </Form>
            </Segment>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Login