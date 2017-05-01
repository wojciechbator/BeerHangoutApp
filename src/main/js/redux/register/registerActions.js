import axios from "axios";

export const REGISTER_FAILED = 'REGISTER_FAILED';

export const addUser = (userData) => {
  return {
    type: ADD_USER,
    userData
  };
};

export const registerUser = (userData) => {
  return dispatch => {
    axios.post('/api/register', userData).then(
      success => {
        dispatch(addUser(success.data));
        dispatch(push('/login'));
      },
      failure => {
        console.error('Failure when trying to register user, reason: ' + failure)
      }
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

export const userDeleted = (user) => {
  return {
    type: DELETE_USER,
    user
  }
};

export const deleteUser = (user) => {
  return dispatch => {
    axios.delete('/api/users').then(
      success => {
        dispatch(userDeleted(user));
        dispatch(usersRefreshed(success.data));
      },
      failure => {
        console.log("Failed to remove user, reason: " + failure);
      }
    );
  }
};