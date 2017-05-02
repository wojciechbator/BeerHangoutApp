/**
  * Created by wojciech on 30.04.17.
  */
import React from 'react';

const Message = (props) => {
  const fromMe = props.fromMe ? 'from-me' : '';
  return (
    <div className={`message ${fromMe}`}>
      <div className='username'>
        {props.username}
      </div>
      <div className='message-body'>
        {props.message}
      </div>
    </div>
  );
};

Message.defaultProps = {
  message: '',
  username: '',
  fromMe: false
};

export default Message;