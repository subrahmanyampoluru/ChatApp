import React from 'react';
import * as utils from "../../utils";

function AvailableRooms({ rooms, setActiveRoom, activeRoom }) {
	let sortObj = rooms.sort(utils.compare);
  return (
    <div className="rooms-list">
      <ul>
        {sortObj.map(room => {
          const active = activeRoom === room ? "active" : "";
          return (
            <li key={room.id} className={active}>
              <div
                onClick={() => setActiveRoom(room)}>
                  {room.name}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AvailableRooms