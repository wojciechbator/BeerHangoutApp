import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import RegisterForm from "../presentation/RegisterForm";
import {registerUser} from "../../redux/users/usersActions";

class RegisterPage extends Component {
  render() {
    return (
      <Grid verticalAlign="middle">
        <Grid.Row centered>
          <RegisterForm registerUser={registerUser} />
        </Grid.Row>
      </Grid>
    );
  }
}

RegisterPage.propTypes = {
  registerUser: React.PropTypes.func.isRequired
}

export default connect(null, { registerUser })(RegisterPage);