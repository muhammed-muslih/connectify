import { io } from "socket.io-client";
const socket = io('https://connectif.online', {
  transports: ["websocket"],
});

export default socket;
