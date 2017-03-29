import React, {Component} from "react";
import {Container, Grid, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import {connect} from "react-redux";

import LoginForm from "../presentation/LoginForm";
import RegisterForm from "../presentation/RegisterForm";
import {authenticated} from "../../redux/authentication/authActions";


class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {authFailed: false};
  }

  handleOnSignIn(event) {
    event.preventDefault();

    const data = event.toString();

    axios.post('/api/authenticate', data)
      .then(
        success => {
          this.props.dispatch(authenticated(success.data));

          const {location} = this.props;
          const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';

          this.context.router.transitionTo(nextPathname);
        },
        failure => {
          console.error(failure);
          this.setState({authFailed: true});
        }
      );
  }

  authFailedMessage() {
    if (!this.state.authFailed) {
      return null;
    }
    return (
      <Message negative>
        <Message.Header>Błąd podczas logowania!</Message.Header>
        <p>Sprawdź, czy podałeś właściwe dane.</p>
      </Message>
    );
  }

  render() {

    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row centered>
              <Segment inverted compact>
                <Header size='medium' style={{marginTop: 12}}>Zaloguj się</Header>
                {this.authFailedMessage()}
                <LoginForm onSubmit={this.handleOnSignIn}/>
              </Segment>
            </Grid.Row>
            <Grid.Row centered>
              <RegisterForm />
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(state => ({auth: state.auth}))(LoginLayout);