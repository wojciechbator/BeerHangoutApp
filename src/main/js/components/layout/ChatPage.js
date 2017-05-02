/**
 * Created by wojciech on 30.04.17.
 */

import React, {Component} from 'react';
import io from 'socket.io-client';
import Navbar from '../presentation/Navbar';
import {Container} from 'semantic-ui-react';

import CommentsContainer from '../containers/CommentsContainer';
import ChatInput from '../presentation/ChatInput';
import socketsConfig from '../utils/socketsConfig';

export default class ChatPage extends Component {
  socket = {};

  constructor(props) {
    super(props);
    this.state = {comments: []};
    this.handleSend = this.handleSend.bind(this);
    this.socket = io().connect(socketsConfig.api);
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  handleSend(message) {
    const messageObject = {
      username: this.props.username,
      message
    };
    this.socket.emit('client:message', messageObject);
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages});
  }

  render() {
    return (
      <div style={{marginTop: 50}}>
        <Navbar activeItem='Chat'/>
        <Container>
          <div className="container">
            <CommentsContainer comments={this.state.comments}/>
          </div>
        </Container>
      </div>
    );
  }

}

ChatPage.defaultProps = {
  username: 'Anonim'
};