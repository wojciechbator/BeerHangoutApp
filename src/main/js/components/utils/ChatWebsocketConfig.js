/**
 * Created by wojciech on 06.05.17.
 */
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

const registerSocket = (registrations) => {
  const socket = new SockJS('/chat');
  const stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    registrations.forEach((registration) => {
      this.stompClient.subscribe(registration.route, registration.callback);
    });
  });
  this.socket.on('server:message', message => {
    this.addMessage(message);
  });
};

export default registerSocket;