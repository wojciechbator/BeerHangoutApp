/**
 * Created by wojciech on 30.04.17.
 */

import React, {Component} from 'react';
import io from 'socket.io-client';

import Messages from '../containers/Messages';
import ChatInput from '../presentation/ChatInput';

export default class ChatPage extends Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.handleSend = this.handleSend.bind(this);
    this.socket = io().connect();
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
    this.setState({ messages });
  }

  render() {
    return (
      <div className="container">
        <h3>Czat!</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.handleSend}/>
      </div>
    );
  }

}

ChatPage.defaultProps = {
  username: 'Anonim'
};