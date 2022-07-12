import { io } from "socket.io-client";

const URL = process.env.VUE_APP_WS_URL || "https://ws.solvemyissue.live";
console.log(URL);
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log("onAny", event, args);
});

export default socket;
