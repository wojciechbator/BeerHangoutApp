/**
 * Created by wojciech on 30.04.17.
 */
import React, {Component} from 'react';
import ChatPage from './layout/ChatPage';

export default class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleUsernameSubmit(event) {
    event.preventDefault();
    this.setState({submitted: true, username: this.state.username});
  }

  render() {
    if (this.state.submitted) {
      return (
        <ChatPage username={this.state.username}/>
      );
    }

    return (
      <form onSubmit={this.handleUsernameSubmit} className="username-container">
        <h1>Czat czasu rzeczywistego</h1>
        <div>
          <input type="text"
                 onChange={this.handleUsernameChange}
                 placeholder="Podaj nazwę użytkownika... (tymczasowo)"
                 required/>
        </div>
        <input type="submit" value="Potwierdź"/>
      </form>
    );
  }
}

ChatApp.defaultProps = {};