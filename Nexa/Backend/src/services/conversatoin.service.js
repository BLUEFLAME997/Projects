import AppError from "../utils/AppError.js";
import conversationModel from "../models/conversation.model.js";

export async function getConversationByIdService(userId,conversationId){
  
  if(!userId){
    throw new AppError('UserId not provided',400);
  }
  if(!conversationId){
    throw new AppError('ConversationId not provided',400);
  }

  const isConversationExist = await conversationModel.findById(conversationId).populate('participants','username email avatar isBot');
  if(!isConversationExist){
    throw new AppError('Invalid conversation Id',400);
  }
  
  const isParticipant = isConversationExist.participants.some(
    p=>p._id.toString() === userId.toString()
  )
  if(!isParticipant){
    throw new AppError('You are not a participant of this conversation',403);
  }

  return isConversationExist;
}

export async function checkConversationService(userId,conversationId){
  if(!userId || !conversationId){
    return {status:false,message:"Credentials not provided"};
  }

  const conversation = await conversationModel.findOne({
    _id:conversationId,
    participants:userId
  })
  if(!conversation){
    return {status:false,message:"Invalid conversation id or not a participant"};
  }

  return {status:true};
}