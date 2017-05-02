import React, {Component} from "react";
import {commentStyles} from "../styles/styles";

class SingleComment extends Component {
  render() {
    const time = new Date(this.props.currentComment.timestamp);
    return (
      <div>
        <p style={commentStyles.comment.singleComment}>
          {this.props.currentComment.content}
        </p>
        <span style={commentStyles.comment.nameAndDate}>{this.props.currentComment.author}</span>
        <span style={commentStyles.comment.pipeStyle}>|</span>
        <span style={commentStyles.comment.nameAndDate}>{time.toLocaleString()}</span>

        <hr />
      </div>
    );
  };
}

SingleComment.PropTypes = {
  currentComment: React.PropTypes.string
};


export default SingleComment;