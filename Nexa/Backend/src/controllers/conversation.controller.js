import { configDotenv } from "dotenv";
import userModel from "../models/user.model.js";
import { privateChatService } from "../services/privateChat.service.js";
import { groupChatSerice } from "../services/groupChat.service.js";
import { aiChatService } from "../services/aiChat.service.js";
import { listConversationService } from "../services/listConversation.service.js";
configDotenv();

export async function createPrivateConversationController(req, res, next) {
  const { otherUserId } = req.body;
  const senderId = req.user.id;
  try {

    const conversation = await privateChatService(otherUserId, senderId);

    return res.status(200).json({
      Message: "Conversation details fetched successfully",
      success: true,
      conversation
    })

  } catch (err) {
    next(err);
  }
}

export async function createGroupConversationController(req, res, next) {
  const { groupname, participantsId, groupavatar } = req.body;
  const creator = req.user.id;

  try {
    const conversation = await groupChatSerice(groupname, creator, participantsId, groupavatar);

    return res.status(201).json({
      Message: "Group created successfully",
      success: true,
      conversation
    })

  } catch (err) {
    next(err);
  }
}

export async function createAiConversationController(req, res, next) {
  const userId = req.user.id;

  try {
    const conversation = await aiChatService(userId);

    return res.status(200).json({
      Message: "Ai chat created successfully",
      conversation
    })

  } catch (err) {
    next(err);
  }
}

export async function getAllMyConversatoinController(req, res, next) {
  const userId = req.user.id;
  try {

    const conversationList = await listConversationService(userId);

    return res.status(200).json({
      Message: "Conversation data fetched successfully",
      success: true,
      conversationList
    })

  } catch (err) {
    next(err);
  }
}

export async function updateGroupInfoController(req, res, next) {
  const { groupname, groupavatar } = req.body;
  const conversationId = req.params.id;
  const userId = req.user.id;


}