import React, {Component} from "react";
import {Form, Grid, Header, Segment} from "semantic-ui-react";
import {Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';

import LoginForm from "../presentation/LoginForm";
import {loginRequest, resetAuth} from '../../redux/authentication/authActions';
import {LoginError} from '../presentation/ErrorMessages';
import {formsStyle} from '../styles/styles';

const drawInput = ({input, label, placeholder, type, meta: {asyncValidating, touched, error}}) => {
  return (
    <div className={asyncValidating ? 'async-validating' : ''}>
      <Form.Input label={label} placeholder={placeholder} {...input} type={type} style={{margin: 6}}/>
      {touched && error && <p style={formsStyle.warningPrompt}><Icon name='warning'/>{error}</p>}
    </div>
  );
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFailed: false,
      signedIn: false,
      username: ''
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetAuth(this.state));
  }

  handleSubmit = (values) => {
    this.setState({username: values.username});
    if (values.username.length === 0) {
      return;
    }
    const credentials = `username=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}`;

    this.props.dispatch(loginRequest(credentials));
  };

  render() {
    return (
      <div>
        <div style={formsStyle.loginStyle}>
          <Grid>
            <Grid.Row centered>
              <Segment inverted compact>
                <Header size='medium' style={{marginTop: 12}}>Zaloguj się</Header>
                {this.props.authFailed ? <LoginError /> : ''}
                <LoginForm onSubmit={this.handleSubmit} drawInput={drawInput}/>
              </Segment>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  authFailed: React.PropTypes.bool,
  signedIn: React.PropTypes.bool,
  username: React.PropTypes.string
};

const mapStateToProps = (store) => {
  return {
    authFailed: store.auth.authFailed,
    signedIn: store.auth.signedIn,
    username: store.auth.username
  }

};

export default connect(mapStateToProps)(LoginPage);
