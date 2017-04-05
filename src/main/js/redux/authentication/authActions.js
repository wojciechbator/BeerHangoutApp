import axios from 'axios';

export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';


export const authenticated = (authData) => {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
};

export const loginRequest = (loginData) => {
  return dispatch => {
    axios.post('/signin', loginData).then(
      onResolve => dispatch.authenticated(loginData),
      onReject => console.error("Couldn't authenticate! Reason: " + onReject)
    );
  };
};

export const loggedOut = () => {
  return {
    type: LOGGED_OUT
  };
};