import React from "react";
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
      </div>
    );
};

SingleComment.PropTypes = {
  currentComment: React.PropTypes.string
};

SingleComment.defaultProps = {
  message: '',
  author: '',
  fromMe: false
};


export default SingleComment;