import { socketAuthMiddleware } from "../middleware/socket.middleware.js";
import mongoose from 'mongoose';
import conversationModel from "../models/conversation.model.js";

export function initializeSocket(io) {

  io.use(socketAuthMiddleware);
  io.on('connection',(socket)=>{
    console.log("User connected successfully: ",socket.id);

    socket.on('conversation:join',async (conversationId)=>{
      
    })

    socket.on('disconnect',(socket)=>{
      console.log('User disconnected')
    })
  })
}