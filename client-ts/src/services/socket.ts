import { validatorDto } from "@/helper/validateDto";
import { ClassConstructor } from "class-transformer";
import { io } from "socket.io-client";

const URL = process.env.VUE_APP_WS_URL || "https://ws.solvemyissue.live";
console.log(URL);
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log("onAny", event, args);
});

export const SocketOn = async function (
  event: string,
  callback: (data: any) => void,
  dto?: ClassConstructor<any> | undefined
) {
  socket.on(event, async function (payload: any) {
    if (dto) await validatorDto(dto, payload);
    callback(payload);
  });
};

export const SocketEmit = async function (
  event: string,
  payload: any,
  dto?: ClassConstructor<any> | undefined
) {
  if (dto) await validatorDto(dto, payload);
  socket.emit(event, payload);
};

export default socket;
