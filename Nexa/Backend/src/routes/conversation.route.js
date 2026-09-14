import express from 'express';
import { createPrivateConversationController, createGroupConversationController } from "../controllers/conversation.controller.js";
import { authUser } from '../middleware/auth.middleware.js';

const conversationRouter = express.Router();

/* 
@route: POST /api/conversation/private
@description: To get the conversation details if exist or create one
*/
conversationRouter.post('/private', authUser, createPrivateConversationController);
/* 
@route: POST /api/conversation/group
@desciption: To create a group conversation with minimum 3 users
*/
conversationRouter.post('/group',authUser,createGroupConversationController);

export default conversationRouter;
