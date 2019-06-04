import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Message from '../Message';

class ChatMessages extends Component {
componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 400 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const {
      activeRoom,
      messages,
      activeUser
    } = this.props;
    console.log("PRPS", messages);
    return (
      <div className="messages">
        {activeRoom &&
          <div>
              {messages.map((message, key) => {
                return (
                  <Message
                    activeRoom={activeRoom}
                    message={message}
                    activeUser={activeUser}
                    key={key} />
                )
              })}
          </div>
        }
      </div>
    );
  }
}

export default ChatMessages;