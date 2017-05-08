import axios from "axios";

export const ADD_COMMENT = 'ADD_COMMENT';
export const COMMENTS_REFRESHED = 'COMMENTS_REFRESHED';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  };
};

export const saveComment = (author, content, timestamp) => {
  return dispatch => {
    axios.post('/api/comments', {author, content, timestamp}).then(
      success => dispatch(addComment(success.data)),
      failure => console.error('Failure when trying to save comment, reason: ' + failure)
    );
  }
};

export const commentsRefreshed = (comments) => {
  return {
    type: COMMENTS_REFRESHED,
    comments
  };
};

export const refreshComments = () => {
  return dispatch => {
    axios.get('/api/comments').then(
      success => dispatch(commentsRefreshed(success.data)),
      failure => console.log('Failure when trying to refresh comments, reason: ' + failure)
    );
  };
};

export const commentDeleted = () => {
  return {
    type: DELETE_COMMENT
  }
};

export const deleteComment = (id) => {
  return dispatch => {
    axios.delete(`/api/comments/${id}`).then(
      success => dispatch(commentDeleted()),
      failure => console.log('Could not remove comment. Error: ' + failure)
    )
  }
};