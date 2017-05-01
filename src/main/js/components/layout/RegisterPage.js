import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import RegisterForm from "../presentation/RegisterForm";
import { registerUser } from "../../redux/users/usersActions";
import styles from '../styles/styles';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFailed: false
    };
  }
  render() {
    return (
      <div>
        <div style={styles.registerStyle}>
          <Grid verticalAlign="middle">
            <Grid.Row centered>
              <RegisterForm registerUser={registerUser} />
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  registerUser: React.PropTypes.func,
  registerFailed: React.PropTypes.bool
};

const mapStateToProps = (store) => {
  return {
    registerFailed: store.users.registerFailed
  }
};
export default connect(mapStateToProps, { registerUser })(RegisterPage);