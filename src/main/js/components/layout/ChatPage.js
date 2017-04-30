/**
 * Created by wojciech on 30.04.17.
 */

import React, {Component} from 'react';
import io from 'socket.io-client';

import socketsConfig from '../utils/socketsConfig';
import Messages from '../containers/Messages';
import ChatInput from '../presentation/ChatInput';

export default class ChatPage extends Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
}