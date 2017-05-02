import React from "react";
import {commentStyles} from "../styles/styles";
import SingleComment from "../presentation/SingleComment";

export const CommentsList = (props) => (
  <ul style={commentStyles.comment.commentsList}>
    {props.comments.map((comment, i) => {
      return (
        <li key={i}>
          <SingleComment currentComment={comment}/>
        </li>
      );
    })}
  </ul>
);