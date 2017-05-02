import React from "react";
import {commentStyles} from "../styles/styles";
import SingleComment from "../presentation/SingleComment";

export const CommentsList = (props) => (
  <ul style={commentStyles.comment.commentsList}>
    {props.comments.map((comment, i) => {
      return (
        <li key={i}>
          <SingleComment author={comment.author}
                         message={comment.content}
                         timestamp={comment.timestamp}
                         fromMe={comment.fromMe}/>
        </li>
      );
    })}
  </ul>
);

CommentsList.PropTypes = {
  comments: React.PropTypes.array
};

CommentsList.defaultProps = {
  comments: []
};