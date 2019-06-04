import React, { Component } from "react";

class ProfileInfo extends Component {
  constructor() {
    super();
    this.state = {
      elapsed: 0
    }
  }

  componentDidMount() {
    const start = new Date();
    setInterval(() =>
      this.setState({
        elapsed: new Date() - start
      }), 1000
    );
  }

  render() {
    return (
      <div className="profile-info">
        <h2>{this.props.activeUser}</h2>
        <p>
          Online for {Math.floor((this.state.elapsed / 1000) / 60)} minutes
        </p>
      </div>
    );
  }
}

export default ProfileInfo;