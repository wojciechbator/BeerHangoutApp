import axios from "axios";

export const ADD_USER = 'ADD_USER';
export const GET_USERS = 'GET_USERS';

export const addUser = (userData) => {
  return {
    type: ADD_USER,
    userData
  };
};

export const registerUser = (userData) => {
  return dispatch => {
    return axios.post('/api/users', userData);
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
