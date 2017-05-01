import React from "react";
import styles from "../styles/styles";
import SingleComment from "../presentation/SingleComment";

export const CommentsList = (props) => (
  <ul style={styles.comment.commentsList}>
    {props.comments.map((comment, i) => {
      return (
        <li key={i}>
          <SingleComment currentComment={comment}/>
        </li>
      );
    })}
  </ul>
);