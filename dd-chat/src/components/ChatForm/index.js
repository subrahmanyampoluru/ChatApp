import React, { Component } from "react";
import io from 'socket.io-client';

var socket = io.connect('http://localhost:3001');

class ChatForm extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      typing: ''
    };
  }

  /* input changes */
  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }


  /* submit messages */
  handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('chat', {room: this.props.activeRoom, name: this.props.activeUser, message: this.state.message});
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    const { disabled } = this.props;
    return (
      <form
        className="message-form"
        onSubmit={this.handleSubmit}
        disabled={disabled}>
        <input
          className="message-field"
          onChange={this.handleChange}
          value={this.state.message}
          disabled={disabled}
          placeholder="Type a message..."
          type="text" />
        <input
          className="message-submit"
          type="submit"
          value="Send" />
      </form>
    );
  }
}

export default ChatForm;