import React, { Component } from "react";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
    
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  /* store username */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setActiveUser(this.state.name);
  }

  render() {
    return (
      <div id="signin-form">
      <form
        onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.name}
          maxLength = {20}
          placeholder="Type your username..."
          type="text" required autoFocus/>
        <button
          type="submit"
          disabled={!this.state.name}>
         Join the DoorDash Chat!</button>
      </form>
    </div>
    );
  }
}

export default SignIn;