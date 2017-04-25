import React, { Component } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import LoginForm from "../presentation/LoginForm";
import styles from '../styles/styles';
import DocumentTitle from 'react-document-title';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { authFailed: false };
  }

  render() {
    return (
      <DocumentTitle title={`zaloguj się`}>
        <div style={styles.loginStyle}>
          <Grid>
            <Grid.Row centered>
              <Segment inverted compact>
                <Header size='medium' style={{ marginTop: 12 }}>Zaloguj się</Header>
                <LoginForm />
              </Segment>
            </Grid.Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }
}

export default LoginPage;
