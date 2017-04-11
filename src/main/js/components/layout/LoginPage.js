import React, {Component} from "react";
import {Grid, Header, Segment} from "semantic-ui-react";
import LoginForm from "../presentation/LoginForm";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {authFailed: false};
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row centered>
            <Segment inverted compact>
              <Header size='medium' style={{marginTop: 12}}>Zaloguj się</Header>
              <LoginForm />
            </Segment>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
