import axios from "axios";
import {push} from 'react-router-redux';

export const ADD_USER = 'ADD_USER';
export const GET_USERS = 'GET_USERS';
export const DELETE_USER = 'DELETE_USER';

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

export const userDeleted = () => {
  return {
    type: DELETE_USER
  }
};

export const deleteUser = (id) => {
  return dispatch => {
    axios.delete(`/api/users/${id}`).then(
      success => dispatch(userDeleted()),
      failure => console.log("Failed to remove user, error: " + failure)
    );
  }
};