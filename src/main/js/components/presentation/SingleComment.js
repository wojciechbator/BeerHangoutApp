import React from "react";
import {Button} from 'semantic-ui-react';

import {commentStyles} from "../styles/styles";

const SingleComment = (props) => {
    const fromMe = props.fromMe ? 'from-me' : '';
    const time = new Date(props.timestamp);
    return (
      <div className={`message ${fromMe}`}>
        <p style={commentStyles.comment.singleComment}>
          {props.message}
        </p>
        <span style={commentStyles.comment.nameAndDate}>{props.author}</span>
        <span style={commentStyles.comment.pipeStyle}>|</span>
        <span style={commentStyles.comment.nameAndDate}>{time.toLocaleString()}</span>
        <hr />
        <Button negative onClick={props.deleteComment}>Usuń</Button>
      </div>
    );
};

SingleComment.PropTypes = {
  message: React.PropTypes.string,
  author: React.PropTypes.string,
  deleteComment: React.PropTypes.func,
  fromMe: React.PropTypes.bool
};

SingleComment.defaultProps = {
  message: '',
  author: '',
  fromMe: false
};


export default SingleComment;