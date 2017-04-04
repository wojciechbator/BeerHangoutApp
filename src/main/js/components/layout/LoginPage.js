import React, {Component} from "react";
import {Grid, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import LoginForm from "../presentation/LoginForm";
import {authenticated} from "../../redux/authentication/authActions";

class LoginPage extends Component {
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
        <Grid>
          <Grid.Row centered>
            <Segment inverted compact>
              <Header size='medium' style={{marginTop: 12}}>Zaloguj się</Header>
              {this.authFailedMessage()}
              <LoginForm onSubmit={this.handleOnSignIn}/>
            </Segment>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
