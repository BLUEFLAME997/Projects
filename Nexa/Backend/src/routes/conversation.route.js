import express from 'express';
import { createPrivateConversationController, createGroupConversationController, createAiConversationController,getAllMyConversatoinController } from "../controllers/conversation.controller.js";
import { authUser } from '../middleware/auth.middleware.js';
import { aiChatService } from '../services/aiChat.service.js';
import upload from '../middleware/upload.middleware.js';

const conversationRouter = express.Router();

/* 
@route: POST /api/conversations/private
@description: To get the conversation details if exist or create one
*/
conversationRouter.post('/private', authUser, createPrivateConversationController);
/* 
@route: POST /api/conversations/group
@desciption: To create a group conversation with minimum 3 users
*/
conversationRouter.post('/group', authUser,upload.single('groupavatar') ,createGroupConversationController);
/* 
@route: POST /api/conversations/ai
@description: To create a Ai conversation 
*/
conversationRouter.post('/ai',authUser,aiChatService);
/* 
@route: GET /api/conversations/
@description: To get all the conversation of the user
*/
conversationRouter.get('/',authUser,getAllMyConversatoinController);

export default conversationRouter;
