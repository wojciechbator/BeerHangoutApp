import axios from "axios";

export const ADD_USER = 'ADD_USER';
export const GET_USERS = 'GET_USERS';

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  };
};

export const saveUser = (username, password, email, firstName, lastName, phone) => {
  return dispatch => {
    axios.post('/api/users', {username, password, email, firstName, lastName, phone}).then(
      success => dispatch(addUser(success.data)),
      failure => console.error('Failure when trying to save user, reason: ' + failure)
    );
  };
};

export const usersRefreshed = (users) => {
  return {
    type: GET_USERS,
    users
  };
};

export const refreshUsers = () => {
  return dispatch => {
    axios.get('/api/users').then(
      success => dispatch(usersRefreshed(success.data)),
      failure => console.log('Failure when trying to refresh users, reason: ' + failure)
    );
  };
};
