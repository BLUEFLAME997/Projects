import AppError from "../utils/AppError.js";
import userModel from "../models/user.model.js";
import conversationModel from "../models/conversation.model.js";

export async function groupChatSerice(groupname, creator, participantsId, groupavatarurl) {

  if (!groupname || !groupname.trim()) {
    throw new AppError('Group name not provided', 400);
  }
  if (!creator) {
    throw new AppError('Creator ID not provided', 400);
  }
  if (!Array.isArray(participantsId) || participantsId.length < 2) {
    throw new AppError('Group cannot be less than 3 people', 400);
  }

  const uniqueParticipantsId = [...new Set(participantsId)];

  const existingUsers = await userModel.find({
    _id: {
      $in: uniqueParticipantsId
    }
  });
  if (existingUsers.length !== uniqueParticipantsId.length) {
    throw new AppError('One or more participants ID is invalid', 400);
  }

  if (groupavatarurl !== undefined) {
    if (!groupavatarurl.trim()) {
      throw new AppError('GroupAvatar cannot be empty', 400);
    }
    conversation.groupAvatar = groupavatarurl;
  }

  const conversation = await conversationModel.create({
    type: 'group',
    groupName: groupname.trim(),
    participants: [creator, ...participantsId],
    createdBy: creator,
    groupAdmins: [creator]
  })

  return conversation;
}

export async function updateGroupService(userId, conversationId, groupname, groupavatarurl) {

  if (!userId) {
    throw new AppError('User id not provided', 400);
  }
  if (!conversationId) {
    throw new AppError('Conversation Id not provided', 400);
  }

  const conversation = await conversationModel.findById(conversationId);
  if (!conversation) {
    throw new AppError('Invalid conversation ID');
  }

  if (groupname !== undefined) {
    if (!groupname.trim()) {
      throw new AppError('Group name cannot be empty', 400);
    }
    conversation.groupName = groupname;
  }
  if (groupavatarurl !== undefined) {
    if (!groupavatarurl.trim()) {
      throw new AppError('Group avatar cannot be empty', 400);
    }
    conversation.groupAvatar = groupavatarurl;
  }

  await conversation.save();
  return conversation;
}

export async function addUserInGroupService(userId,conversationId,adminId){
  if(!userId){
    throw new AppError('UserID not provided',400);
  }
  if(!conversationId){
    throw new AppError('ConversationID not provided',400);
  }

  const isUserExist = await userModel.findById(userId);
  if(!isUserExist){
    throw new AppError('Invalid user Id',404);
  }
  const conversation = await conversationModel.findById(conversationId);
  
  if(!conversation){
    throw new AppError('Invalid conversation Id',404);
  }

  const isAdmin = conversation.groupAdmins.some(
    admin => admin.toString() === adminId.toString()
  )
  if(!isAdmin){
    throw new AppError('You are not a group admin',403);
  }

  conversation.participants.push(userId);
  await conversation.save();
  
  return conversation;
}

export async function removeMemberFromGroupService(userId,conversationId,adminId){
  if(!userId){
    throw new AppError('UserId not provided',400);
  }
  if(!conversationId){
    throw new AppError('ConversationId not provided',400);
  }

  const isUserExist = await userModel.findById(userId);
  if(!isUserExist){
    throw new AppError("Invalid user Id",404)
  }
  
  const conversation = await conversationModel.findById(conversationId);
  if(!conversation){
    throw new AppError('Invalid conversation ID',404);
  }
  
  const isGroupAdmin = conversation.groupAdmins.some(
    admin => adminId.toString() === admin.toString()
  )
  if(!isGroupAdmin){
    throw new AppError('You are not a group admin',403)
  }

  conversation.groupAdmins = conversation.groupAdmins.filter(
    user => user.toString() !== userId.toString()
  )

  await conversation.save();
  return conversation;
}
