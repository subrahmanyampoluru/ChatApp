import React, { Component } from "react";
import SignIn from '../components/SignIn';
import ProfileInfo from '../components/ProfileInfo';
import AvailableRooms from '../components/AvailableRooms';
import * as api from "../services";
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatForm from '../components/ChatForm';
import io from 'socket.io-client';
let socket = io.connect('http://localhost:3001');

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: "",
      activeRoom: null,
      rooms: [],
      messages: [],
      roomInfo: null,
    };
    let $this = this;
    
    socket.on('chat', (data) => {
      $this.setState({
            messages: [...$this.state.messages, {name: data.username, message: data.message}]
        });
    });
  }

  /* Load all rooms */
  async componentDidMount() {
    const data = await api.getRooms();
     this.setState({
      rooms: data
     });
  }

  /* Set Active User */
  setActiveUser = (activeUser) => {
    this.setState({ activeUser });
  }

  /* Set Active Room */
  setActiveRoom = (activeRoom) => {
    this.setState({ activeRoom });
    this.getAllMessages(activeRoom.id);
    this.getRoomInfo(activeRoom.id);
    socket.emit('join room', {room: activeRoom.id, name: this.state.activeUser})
  }

  /* Get Room Info */
  getRoomInfo = (roomId) => {
    (async () => {
         const roomData = await api.getRoomInfo(roomId);
          this.setState({
          roomInfo: roomData
         });
    })();
  }

  /* Get all message from rooms */
  getAllMessages = (roomId) => {
    let $this = this;
    (async () => {
         const roomData = await api.getMsgs(roomId);
         $this.setState({
            messages: roomData
        });
    })();
  }

  /* Sending Message to Room */
  sendMessage = (message) => {
    var obj = {
      name: this.state.activeUser,
      message
    }
    console.log("JSON", JSON.stringify(obj));
    (async () => {
         const roomData = await api.sendMsgs(this.state.activeRoom.id, obj);
         return roomData;
    })();
  }


  render() {
    return (
      <div id="wrapper">
        {this.state.activeUser ? (
          <div className="content">
            <aside className="sidebar">
                <ProfileInfo activeUser={this.state.activeUser} />
                <AvailableRooms
                  activeUser={this.state.activeUser}
                  rooms={this.state.rooms}
                  setActiveRoom={this.setActiveRoom}
                  activeRoom={this.state.activeRoom} />
            </aside>
            <section className="chat-panel">
                <ChatHeader
                  activeUser={this.state.activeUser}
                  roomInfo={this.state.roomInfo} />
                <ChatMessages
                  activeUser={this.state.activeUser}
                  activeRoom={this.state.activeRoom}
                  messages={this.state.messages} />
                <ChatForm
                  activeUser={this.state.activeUser}
                  sendMessage={this.sendMessage}
                  activeRoom={this.state.activeRoom}
                  disabled={!this.state.activeRoom} />
            </section>
          </div>
        ) : (
          <SignIn setActiveUser={this.setActiveUser} />
        )}
      </div>
    );
  }
}
export default App;