import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ADD_COMMENT, COMMENTS_REFRESHED, AUTHENTICATED, LOGGED_OUT, GOT_USERS } from './actions';

function commentsReducer(state = { status: 'stale', data: [] }, action) {
  switch(action.type) {
    case ADD_COMMENT:
      return {
        status: state.status,
        data: state.data.concat(action.comment)
      };

    case COMMENTS_REFRESHED:
      return {
        status: 'loaded',
        data: action.comments
      };

    default:
      return state;
  }
}

function usersReducer(state = { data: [] }, action) {
  switch (action.type){
      case GOT_USERS:
        return {
            data: action.users
        };
      default:
        return state;
  }
}

function authReducer(state = { signedIn: false, roles: [] }, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        signedIn: true,
        roles: action.roles
      });

    case LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

function errorsReducer(state = {}) {
  return state;
}

const reducers = combineReducers(Object.assign({}, {
  auth: authReducer,
  comments: commentsReducer,
  users: usersReducer,
  errors: errorsReducer,
  routing: routerReducer
}));


export default reducers;