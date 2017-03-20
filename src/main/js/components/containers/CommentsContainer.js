import React, { Component } from 'react';
import SingleComment from '../presentation/SingleComment';
import { Header, Form, Button, Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { saveComment, refreshComments } from '../../redux/actions';

require('../../../../../node_modules/semantic-ui/dist/components/form.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/button.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/header.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/comment.min.css');

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list: [
        { body: 'Comment 1', username: 'Wojtek', timestamp: (new Date()).toLocaleString() },
        { body: 'Comment 2', username: 'Kacper', timestamp: (new Date()).toLocaleString() },
        { body: 'Comment 3', username: 'Jurek', timestamp: (new Date()).toLocaleString() },
        { body: 'Comment 4', username: 'Alfons', timestamp: (new Date()).toLocaleString() }
      ]
    }
    this.submitComment = this.submitComment.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.updateTimestamp = this.updateTimestamp.bind(this);
    this.handleRefreshComments = this.handleRefreshComments.bind(this);
  }

  componentDidMount() {
    if (this.props.status === 'stale') {
      this.props.dispatch(refreshComments());
    }
  }

  submitComment(e) {
    e.preventDefault();
    const author = this.state.comment.username;
    const content = this.state.comment.body;
    const timestamp = (new Date()).toLocaleString();
    this.props.dispatch(saveComment(author, content, timestamp));
    this.props.dispatch(refreshComments());
  }

  handleRefreshComments() {
    this.props.dispatch(refreshComments());
  }

  updateUsername(event) {
    console.log('updateUsername: ' + event.target.value);
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['username'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  updateBody(event) {
    console.log('updateBody: ' + event.target.value);
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['body'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  updateTimestamp(comment) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['timestamp'] = (new Date()).toLocaleString();
    this.setState({
      comment: updatedComment
    });
  }

  render() {
    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}><SingleComment currentComment={comment} /></li>
      );
    })
    return (
      <div>
        <Comment.Group>
          <Header as="h3" style={{marginTop: 12}}>Komentarze: </Header>
          <ul style={styles.comment.commentsList}>{commentList}</ul>
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

export default connect()(CommentsContainer);