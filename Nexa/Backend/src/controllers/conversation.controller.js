import userModel from "../models/user.model.js";
import { privateChatService } from "../services/privateChat.service.js";

export async function conversationController(req, res, next) {
  const { type } = req.body;

  if (type === 'private') {
    const { otherUserId } = req.body;
    const senderId = req.user.id;
    try {
      const response = await privateChatService(otherUserId,senderId);
    } catch (err) {
      next(err);
    }
  }
}