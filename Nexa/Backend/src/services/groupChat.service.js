import AppError from "../utils/AppError.js";
import userModel from "../models/user.model.js";
import conversationModel from "../models/conversation.model.js";

export async function groupChatSerice(groupname,creator,participantsId){
  
  if(!groupname || !groupname.trim()){
    throw new AppError('Group name not provided',400);
  }
  if(!creator){
    throw new AppError('Creator ID not provided',400);
  }
  if(!Array.isArray(participantsId) || participantsId.length<2){
    throw new AppError('Group cannot be less than 3 people',400);
  }

  const existingUsers = await userModel.find({
    _id:{
      $in:participantsId
    }
  });
  if(existingUsers.length!==participantsId.length){
    throw new AppError('One or more participants ID is invalid',400);
  }

  const conversation = await conversationModel.create({
    type:'group',
    groupName:groupname.trim(),
    participants:[creator,...participantsId],
    createdBy:creator,
    groupAdmins:[creator]
  })

  return conversation;
}