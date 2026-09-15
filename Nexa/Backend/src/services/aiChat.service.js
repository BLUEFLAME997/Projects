import { configDotenv } from "dotenv";
import conversationModel from "../models/conversation.model.js";
import AppError from "../utils/AppError.js";
configDotenv();

export async function aiChatService(userId) {
  if(!userId){
    throw new AppError('UserId not provided',400);
  }
  
  const conversation = await conversationModel.create({
    type:'ai',
    participants:[userId,process.env.AI_USER_ID]
  })

  return conversation;
}
