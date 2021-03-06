import React, {Component} from "react";
import CommentsList from "./CommentsList";
import {commentStyles, placeStyle, universalStyles} from "../styles/styles";
import {Button, Comment, Form, Header} from "semantic-ui-react";
import {connect} from "react-redux";
import {refreshComments, saveComment} from "../../redux/comments/commentsActions";

require('../../../../../node_modules/semantic-ui/dist/components/form.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/button.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/header.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/comment.min.css');

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // author: this.props.comment
      comments: this.props.comments
    };
    this.submitComment = this.submitComment.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.handleRefreshComments = this.handleRefreshComments.bind(this);
  }

  componentDidMount() {
    if (this.props.status !== 'loaded') {
      this.props.dispatch(refreshComments());
      this.setState({
        comments: this.props.comments
      })
    }
  }

/* to psuje focus scroola, ktory zawsze zjezdza na dol po usunieciu komentarza, moim zdaniem zbedne
  componentDidUpdate() {
    const messagesListDiv = document.getElementById('messageList');
    messagesListDiv.scrollTop = messagesListDiv.scrollHeight;
  }
*/

  submitComment(event) {
    event.preventDefault();
    const author = this.state.comment.author;
    const content = this.state.comment.content;
    const timestamp = (new Date()).getTime();
    this.props.dispatch(saveComment(author, content, timestamp));
    this.setState({
      comments: this.props.comments
    });
    this.handleRefreshComments();
  }

  handleRefreshComments() {
    this.props.dispatch(refreshComments());
  }

  updateUsername(event) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['author'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  updateBody(event) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['content'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  render() {
    return (
      <div style={commentStyles.comment.commentsContainer}>
        <Header as="h3" style={universalStyles.header}>Komentarze: </Header>
        <Comment.Group style={commentStyles.comment.commentsBox} >
          { this.props.comments.length === 0
            ? <p style={{color:'white'}}>Bądź pierwszym, który skomentuje!</p>
            : <CommentsList comments={this.props.comments}/>}
        </Comment.Group>
          {this.props.signedIn ?
              <Form reply onSubmit={this.submitComment}>
                <Header as="h3" style={universalStyles.header}>Skomentuj</Header>
                <Form.Input fluid onChange={this.updateUsername} type="text"/>
                <Form.TextArea autoHeight style={placeStyle.inputs.textArea} onChange={this.updateBody} type="text"/>
                <Button type="submit" content='Odpowiedz' color="green"/>
              </Form>
              : <Header as="h3" style={universalStyles.header}>Zaloguj się aby dodawać komentarze! </Header>
          }

              </div>
    );
  };
}

CommentsContainer.propTypes = {
  status: React.PropTypes.string,
  comment: React.PropTypes.object,
  comments: React.PropTypes.array,
    signedIn: React.PropTypes.bool
};


CommentsContainer.defaultProps = {};

const mapStateToProps = (store) => {
  return {
    status: store.comments.status,
    comments: store.comments.data,
      signedIn: store.auth.signedIn
  };
};

export default connect(mapStateToProps)(CommentsContainer);