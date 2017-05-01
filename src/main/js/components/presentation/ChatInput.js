/**
 * Created by wojciech on 30.04.17.
 */

import React, {Component} from 'react';

export default class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ chatInput: ''});
    this.props.onSend(this.state.chatInput);
  }

  handleTextChange(event) {
    //TODO REDUX!
    this.setState({ chatInput: event.target.value });
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.handleSubmit}>
        <input type="text"
               onChange={this.handleTextChange}
               value={this.state.chatInput}
               placeholder="Napisz coś..."
               required />
      </form>
    );
  }
}

ChatInput.defaultProps = {};