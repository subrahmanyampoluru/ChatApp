import * as constants from "../constants";

/* Get all rooms service */
export const getRooms = async () => {
  let res = await fetch(constants.APIS.GET_ROOMS);
  return res.json();
}

/* Room Info service */
export const getRoomInfo = async (roomId) => {
  let res = await fetch(constants.APIS.GET_ROOMS + `/${roomId}`);
  return res.json();
}

/* Get room messages service */
export const getMsgs = async (roomId) => {
  let res = await fetch(constants.APIS.GET_ROOMS +'/'+ roomId + '/messages');
  return res.json();
}

/* Sending message to service */
export const sendMsgs = async (currentRoomId, msgs) => {
  let res = await fetch(constants.APIS.GET_ROOMS +'/'+ currentRoomId + '/messages',{
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(msgs)
  }).then((response) => {
    return response.json();
  }).catch(e => console.log("ERR:", e)
  );
  return res;
}


