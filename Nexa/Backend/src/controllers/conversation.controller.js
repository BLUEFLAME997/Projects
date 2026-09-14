import userModel from "../models/user.model.js";
import { privateChatService } from "../services/privateChat.service.js";

export async function conversationController(req, res, next) {
  const { type } = req.body;

  if (type === 'private') {
    const { otherUserId } = req.body;
    const senderId = req.user.id;
    try {
      const conversation = await privateChatService(otherUserId,senderId);
      
      return res.status(200).json({
        Message:"Conversation details fetched successfully",
        success:true,
        conversation
      })

    } catch (err) {
      next(err);
    }
  }else if(type === 'group'){
    
  }

}