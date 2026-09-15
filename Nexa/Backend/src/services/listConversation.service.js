import conversationModel from "../models/conversation.model.js";
import AppError from "../utils/AppError.js";

export async function listConversationService(userId) {
  if (!userId) {
    throw new AppError('UserId not provided', 400);
  }

  const conversation = await conversationModel.find({
    participants: userId,
    lastMessage: {
      $exists: true
    }
  }).sort({ updatedAt: -1 });

  return conversation;
}
