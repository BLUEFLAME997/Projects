import AppError from "../utils/AppError.js";
import conversationModel from "../models/conversation.model.js";

export async function privateChatService(otherUserId, senderId) {

  if (!otherUserId) {
    throw new AppError('Other User Id not provided', 400);
  }

  const isOtherUserExist = await userModel.findById(otherUserId);
  if (!isOtherUserExist) {
    throw new AppError('User not found', 404);
  }

  const participantKey = [senderId, otherUserId].sort().join('_');
  let conversation = await conversationModel.findOne({
    participantsKey: participantKey
  })
  if (!conversation) {
    conversation = await conversationModel.create({
      type: 'private',
      participants: [senderId, otherUserId],
      participantsKey: participantKey
    })
  }

  return conversation;
}
