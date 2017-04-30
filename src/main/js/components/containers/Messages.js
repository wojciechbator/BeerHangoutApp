/**
 * Created by wojciech on 30.04.17.
 */
import React, {Component} from 'react';
import Message from '../presentation/Message';

export default class Messages extends Component {
  /**
   * This method auto scrolls to bottom with each new message added,
   * very cool User Experience, as we are used to such behavior
   */
  componentDidUpdate() {
    const messagesListDiv = document.getElementById('messageList');
    messagesListDiv.scrollTop = messagesListDiv.scrollHeight;
  }

  render() {
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message key={i} username={message.username} message={message.message} fromMe={message.fromMe}/>
      );
    });

    return (
      <div className="messages" id="messageList">
        { messages }
      </div>
    );
  }
}

//TODO connect chat with redux and database :)
Messages.defaultProps = {
  messages: []
};