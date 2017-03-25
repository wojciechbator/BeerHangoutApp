import React, { Component } from 'react';
import styles from '../styles/styles';
import SingleComment from '../presentation/SingleComment';

export default class CommentsList extends Component {
  render() {
    return (
      <ul style={styles.comment.commentsList}>
        {this.props.comments.map((comment, i) => {
          return (
            <li key={i}>
              <SingleComment currentComment={comment} />
            </li>
          );
        })}
      </ul>
    );
  }
}