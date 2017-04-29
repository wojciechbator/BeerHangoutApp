import React, { Component } from "react";
import { Form, Grid, Header, Segment } from "semantic-ui-react";
import DocumentTitle from 'react-document-title';
import {Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';

import LoginForm from "../presentation/LoginForm";
import {loginRequest} from '../../redux/authentication/authActions';
import styles from '../styles/styles';


const handleSubmit = (values) => {
  if (values.username.length === 0) {
    return;
  }
  const credentials = `username=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}`;

  this.props.dispatch(loginRequest(credentials));
};

const drawInput = ({input, label, placeholder, type, meta: {asyncValidating, touched, error}}) => {
  return (
    <div className={asyncValidating ? 'async-validating' : ''}>
      <Form.Input label={label} placeholder={placeholder} {...input} type={type} style={{margin: 6}}/>
      {touched && error && <p style={styles.warningPrompt}><Icon name='warning'/>{error}</p>}
    </div>
  );
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFailed: false,
      signedIn: false
    };
  }

  render() {
    return (
      <DocumentTitle title={`zaloguj się`}>
        <div style={styles.loginStyle}>
          <Grid>
            <Grid.Row centered>
              <Segment inverted compact>
                <Header size='medium' style={{ marginTop: 12 }}>Zaloguj się</Header>
                <LoginForm onSubmit={handleSubmit} authFailed={this.state.authFailed} isLogged={this.state.signedIn} drawInput={drawInput} />
              </Segment>
            </Grid.Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    authFailed: store.auth.authFailed,
    signedIn: store.auth.signedIn
  }

};

export default connect(mapStateToProps)(LoginPage);
