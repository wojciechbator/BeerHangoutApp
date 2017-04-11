import axios from 'axios';

export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';


export const authenticated = (authData) => {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
};

export const loginRequest = (data) => {
  return dispatch => {
    axios.post('/api/authenticate', data)
      .then(
        success => {
          dispatch(authenticated(success.data));
          const { location } = this.props;
          const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';
          this.context.router.transitionTo(nextPathname);
        },
        failure => {
          console.error(failure);
          this.setState({ authFailed: true });
        }
      );
  };
};

export const loggedOut = () => {
  return {
    type: LOGGED_OUT
  };
};