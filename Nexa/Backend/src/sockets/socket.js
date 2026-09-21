import { socketAuthMiddleware } from "../middleware/socket.middleware.js";
import { requestToJoinRoomHandler } from "./handlers/conversation.handler.js";

export function initializeSocket(io) {

  io.use(socketAuthMiddleware);

  io.on('connection',(socket)=>{
    console.log("User connected successfully: ",socket.id);

    requestToJoinRoomHandler(io,socket);

    socket.on('disconnect',(socket)=>{
      console.log('User disconnected')
    })
  })
}