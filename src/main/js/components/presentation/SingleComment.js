import React, {Component} from "react";
import styles from "../styles/styles";

class SingleComment extends Component {
  render() {
    const time = new Date(this.props.currentComment.timestamp);
    return (
      <div>
        <p style={styles.comment.singleComment}>
          {this.props.currentComment.content}
        </p>
        <span style={styles.comment.nameAndDate}>{this.props.currentComment.author}</span>
        <span style={styles.comment.pipeStyle}>|</span>
        <span style={styles.comment.nameAndDate}>{time.toLocaleString()}</span>

        <hr />
      </div>
    );
  };
}


export default SingleComment;