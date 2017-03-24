import React, { Component } from 'react';
import SingleComment from '../presentation/SingleComment';
import { Header, Form, Button, Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { saveComment, refreshComments } from '../../redux/comments/commentsActions';

require('../../../../../node_modules/semantic-ui/dist/components/form.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/button.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/header.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/comment.min.css');

class CommentsContainer extends Component {
  constructor(props) {
    super(props);

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

  submitComment(e) {
    e.preventDefault();
    const author = this.state.comment.username;
    const content = this.state.comment.body;
    const timestamp = (new Date()).toLocaleString();
    this.props.dispatch(saveComment(author, content, timestamp));
    this.setState({
        comments: this.props.comments
    });
  }

  handleRefreshComments() {
    this.props.dispatch(refreshComments());
  }
  
  updateUsername(event) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['username'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  updateBody(event) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['body'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  render() {
    const commentsList = this.props.comments.map((comment, i) => {
      return (
        <li key={i}><SingleComment currentComment={comment} /></li>
      );
    })
    return (
      <div>
        <Comment.Group>
          <Header as="h3" style={{marginTop: 12}}>Komentarze: </Header>
           { this.props.comments.length === 0
            ? <p>Bądź pierwszym, który skomentuje!</p>
            : <ul style={styles.comment.commentsList}>{commentsList}</ul> }
        </Comment.Group>
        <Form reply onSubmit={this.submitComment}>
          <Header as="h3" style={{marginTop: 12}}>Skomentuj</Header>
          <Form.Input value={this.state.comment.username} onChange={this.updateUsername} type="text"/>
          <Form.TextArea value={this.state.comment.body} onChange={this.updateBody} type="text" />
          <Button type="submit" content='Odpowiedz' color="green" />
        </Form>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    status: state.comments.status,
    comments: state.comments.data
  };
}

export default connect(mapStateToProps)(CommentsContainer);