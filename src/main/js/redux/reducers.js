import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import {AUTH_FAILED, AUTH_RESET, AUTHENTICATED, LOGGED_OUT} from "./authentication/authActions";
import {ADD_COMMENT, COMMENTS_REFRESHED} from "./comments/commentsActions";
import {ADD_USER, DELETE_USER, GET_USERS} from "./users/usersActions";
import{REFRESH_VENUES} from "./venues/venuesActions";

const commentsReducer = (state = {status: 'stale', data: []}, action) => {
  switch (action.type) {
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
};

const usersReducer = (state = {data: []}, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        data: state.data.concat(action.user)
      };

    case GET_USERS:
      return {
        data: action.users
      };

    case DELETE_USER:
      return {
        data: state.data.splice(action.id)
      };
    default:
      return state;
  }
};
const venuesReducer = (state= { id:[]},action) => {
  switch (action.type) {
      case REFRESH_VENUES:
          return {
              id: action.id,

          };
      default:
          return state;
  }

  };
const authReducer = (state = {signedIn: false, roles: [], authFailed: false, username: ''}, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        signedIn: true,
        roles: action.roles,
        authFailed: false,
        username: action.username
      });

    case AUTH_FAILED:
      return Object.assign({}, state, {
        signedIn: false,
        roles: [],
        authFailed: true
      });

    case LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS'],
        authFailed: false,
        username: ''
      });

    case AUTH_RESET:
      return Object.assign({}, state, {
        authFailed: false
      });

    default:
      return state;
  }
};

const errorsReducer = (state = {}) => {
  return state;
};

const reducers = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  users: usersReducer,
  errors: errorsReducer,
  routing: routerReducer,
  form: formReducer,
    venues: venuesReducer
});

export default reducers;