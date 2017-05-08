/**
 * Created by wojciech on 30.04.17.
 */

import React, {Component} from "react";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import Navbar from "../presentation/Navbar";
import {Container} from "semantic-ui-react";

import registerSocket from '../utils/ChatWebsocketConfig';
import CommentsContainer from "../containers/CommentsContainer";

export default class ChatPage extends Component {
  socket = {};
  stompClient = null;

  constructor(props) {
    super(props);
    this.state = {comments: [], pageSize: ''};
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    this.loadFromServer(this.state.pageSize);
    registerSocket([
      {route: '/topic/newMessage', callback: this.refreshAndGoToLastMessage},
      {route: '/topic/updateMessage', callback: this.refreshCurrentPage},
      {route: '/topic/deleteMessage', callback: this.refreshCurrentPage}
    ]);
  }

  refreshAndGoToLastMessage(message) {
    follow
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