import axios from 'axios';
import {push} from 'react-router-redux';

export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTH_FAILED = 'AUTH_FAILED';
export const LOGGED_OUT = 'LOGGED_OUT';
export const UNSUCCESSFUL_LOGOUT = "UNSUCCESSFUL_LOGOUT";
export const TRANSITION_TO_LOGIN = "TRANSITION_TO_LOGIN";

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

export const loggedOut = (data) => {
  return {
    type: LOGGED_OUT,
    data
  };
};

export const unsuccessfulLogoutAttempt = (data) => {
  return {
    type: UNSUCCESSFUL_LOGOUT,
    data
  }
};

export const transitionToLoginAction = () => {
  return {
    type: TRANSITION_TO_LOGIN
  }
};

export const loginRequest = (data) => {
  return dispatch => {
    axios.post('/api/authenticate', data)
      .then(
        success => {
          dispatch(authenticated(success.data));
          dispatch(push('/'));
        },
        failure => {
          dispatch(authFailed(failure.data));
        }
      );
  };
};

export const logoutRequest = (data) => {
  return dispatch => {
    axios.post('/api/logout', data)
      .then(
        success => {
          dispatch(loggedOut(success.data));
        },
        failure => {
          dispatch(unsuccessfulLogoutAttempt(failure.data));
        }
      )
  }
};

export const transitionToLogin = () => {
  return dispatch => {
    dispatch(transitionToLoginAction());
    dispatch(push('/login'));
  }

};


