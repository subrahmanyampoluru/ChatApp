import React from "react";

function ChatHeader({ activeUser, roomInfo }) {
  return (
    <div className="room-info">
      {roomInfo
        ? <div className="room">
            <h2>{roomInfo.name}</h2>
            <h5> <span>{activeUser}</span>, {roomInfo.users.join(', ')}</h5>
          </div>
        : <h2 className="room">Welcome DoorDash Chat Application</h2>
      }
    </div>
  );
}

export default ChatHeader;