import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import DocumentTitle from 'react-document-title';

import RegisterForm from "../presentation/RegisterForm";
import { registerUser } from "../../redux/users/usersActions";
import styles from '../styles/styles';

class RegisterPage extends Component {
  render() {
    return (
      <DocumentTitle title={`zarejestruj się`}>
        <div style={styles.registerStyle}>
          <Grid verticalAlign="middle">
            <Grid.Row centered>
              <RegisterForm registerUser={registerUser} />
            </Grid.Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }
}

RegisterPage.propTypes = {
  registerUser: React.PropTypes.func.isRequired
};

export default connect(null, { registerUser })(RegisterPage);