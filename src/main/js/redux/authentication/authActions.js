import axios from 'axios';

export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTH_FAILED = 'AUTH_FAILED';
export const LOGGED_OUT = 'LOGGED_OUT';
export const UNSUCCESSFUL_LOGOUT = "UNSUCCESSFUL_LOGOUT";


export const authenticated = (authData) => {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
};

export const authFailed = (authData) => {
  return {
    type: AUTH_FAILED,
    authData
  }
};

export const loggedOut = () => {
  return {
    type: LOGGED_OUT
  };
};

export const loginRequest = (data) => {
  return dispatch => {
    axios.post('/api/authenticate', data)
      .then(
        success => {
          dispatch(authenticated(success.data));
        },
        failure => {
          dispatch(authFailed(failure.data));
        }
      );
  };
};

export const logoutRequest = (data) => {
  return dispatch => {
    axios.post('/api/signout', data)
      .then(
        success => {
          dispatch(loggedOut(success.data));
        },
        failure => {

        }
      )
  }
};


export const unsuccessfulLogoutAttempt = () => {
  return {
    type: UNSUCCESSFUL_LOGOUT
  }
};