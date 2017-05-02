import React, {Component} from "react";
import {connect} from 'react-redux';

import {commentStyles} from "../styles/styles";
import SingleComment from "../presentation/SingleComment";
import {deleteComment} from "../../redux/comments/commentsActions";



class CommentsList extends Component {

  removeComment(id) {
    this.props.dispatch(deleteComment(id));
  };

  render() {
    return (
      <ul style={commentStyles.comment.commentsList}>
        {this.props.comments.map((comment, i) => {
          return (
            <li key={i}>
              <SingleComment author={comment.author}
                             message={comment.content}
                             timestamp={comment.timestamp}
                             fromMe={comment.fromMe}
                             deleteComment={() => this.removeComment(comment.id)}/>
            </li>
          );
        })}
      </ul>
    );
  }
}

CommentsList.PropTypes = {
  comments: React.PropTypes.array
};

CommentsList.defaultProps = {
  comments: []
};

export default connect()(CommentsList);