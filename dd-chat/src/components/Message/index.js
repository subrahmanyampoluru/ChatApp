import React, { Component } from "react";


class Message extends Component {
  
  render() {
    const {
      message,
      activeUser
    } = this.props;
    return (
      <div
        className={message.name === activeUser
          ? "my-message"
          : "other-message"
        }
        key={message.id}>
        <span className="message chat-message">
          {message.message}
        </span>
        <span className="message chat-name">{message.name}</span>
      </div>
    )
  }
}

export default Message;