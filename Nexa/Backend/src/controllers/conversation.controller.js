import { configDotenv } from "dotenv";
import userModel from "../models/user.model.js";
import { privateChatService } from "../services/privateChat.service.js";
import { groupChatSerice, updateGroupService, addUserInGroupService, removeMemberFromGroupService } from "../services/groupChat.service.js";
import { aiChatService } from "../services/aiChat.service.js";
import { listConversationService } from "../services/listConversation.service.js";
import { uploadImageService } from "../services/imagekit.service.js";
import { getConversationByIdService } from "../services/conversatoin.service.js";
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
    let groupavatarurl;
    if (req.file) {
      groupavatarurl = await uploadImageService(req.file.originalname, req.file.buffer);
    }
    const conversation = await groupChatSerice(groupname, creator, participantsId, groupavatarurl);

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

  try {

    let groupAvatarUrl;
    if (req.file) {
      groupAvatarUrl = await uploadImageService(req.file.originalname, req.file.buffer);
    }

    const updateGroup = await updateGroupService(userId, conversationId, groupname, groupAvatarUrl);
    return res.status().json({
      Message: "Group data updated successfully",
      success: true
    })
  } catch (err) {
    next(err);
  }

}

export async function getConversationByIdController(req, res, next) {

  const { conversationId } = req.params;
  const userId = req.user.id;

  try {

    const converstaion = await getConversationByIdController(userId, conversationId);

    return res.status(200).json({
      Message: "Conversation data fetched successfully",
      success: true,
      converstaion
    })

  } catch (err) {
    next(err);
  }
}

export async function addUserInGroupController(req, res, next) {
  const { conversationId } = req.params;
  const {userId} = req.body;
  const adminId = req.user.id;
  
  try {
  
    const conversation = await addUserInGroupController(userId, conversationId, adminId);
  
    return res.status(200).json({
      Message: "User added in the group successfully",
      success: true,
      conversation
    })
  
  } catch (err) {

  }
}

export async function removeUserFromGroupController(req, res, next) {
  const { conversationId, userId } = req.params;
  const adminId = req.user.id;

  try {

    const conversation = await removeMemberFromGroupService(userId, conversationId, adminId);

    return res.status(200).json({
      Message: "User remove from the group successfully",
      conversation
    })

  } catch (err) {
    next(err);
  }
}
