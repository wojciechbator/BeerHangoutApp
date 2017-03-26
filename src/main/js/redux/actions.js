import axios from 'axios';

export const ADD_COMMENT = 'ADD_COMMENT';
export const COMMENTS_REFRESHED = 'COMMENTS_REFRESHED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';
export const GOT_USERS = 'GOT_USERS';

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    };
}

export function saveComment(author, content, timestamp) {
    return dispatch => {
        axios.post('/api/comments', {author, content, timestamp}).then(
            success => dispatch(addComment(success.data)),
            failure => console.error('Failure when trying to save comment, reason: ' + failure)
        );
    };
}

export function commentsRefreshed(comments) {
    return {
        type: COMMENTS_REFRESHED,
        comments
    };
}

export function refreshComments() {
    return dispatch => {
        axios.get('/api/comments').then(
            success => dispatch(commentsRefreshed(success.data)),
            failure => console.log('Failure when trying to refresh comments, reason: ' + failure)
        );
    };
}

function gotUsers(users) {
    /*don't know why is this yet*/
    return {
        type: GOT_USERS,
        users
    };
}

export function getUsers() {
    return dispatch => {
        axios.get('/users').then(
            success => dispatch(gotUsers(success.data)),
            failure => console.log('Failure when trying getting users, reason: ' + failure)
        );
    };
}

export function authenticated(authData) {
    return {
        type: AUTHENTICATED,
        roles: authData.roles
    };
}

export function loggedOut() {
    return {
        type: LOGGED_OUT
    };
}