import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {AUTHENTICATED, LOGGED_OUT} from "./authentication/authActions";
import {ADD_COMMENT, COMMENTS_REFRESHED} from "./comments/commentsActions";
import {reducer as formReducer} from "redux-form";

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

const authReducer = (state = {signedIn: false, roles: []}, action) => {
  switch (action.type) {
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
};

const errorsReducer = (state = {}) => {
  return state;
};

const reducers = combineReducers(Object.assign({}, {
  auth: authReducer,
  comments: commentsReducer,
  errors: errorsReducer,
  routing: routerReducer,
  form: formReducer
}));


export default reducers;
