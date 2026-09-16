import express from 'express';
import {
  createPrivateConversationController, createGroupConversationController, createAiConversationController, getAllMyConversatoinController, updateGroupInfoController,getConversationByIdController
} from "../controllers/conversation.controller.js";
import { authUser } from '../middleware/auth.middleware.js';
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
conversationRouter.post('/group', authUser, upload.single('groupavatar'), createGroupConversationController);
/* 
@route: POST /api/conversations/ai
@description: To create a Ai conversation 
*/
conversationRouter.post('/ai', authUser, createAiConversationController);
/* 
@route: GET /api/conversations/
@description: To get all the conversation of the user
*/
conversationRouter.get('/', authUser, getAllMyConversatoinController);
/* 
@route: PATCH /api/conversations/:groupId
@description: To update the group info 
*/
conversationRouter.patch('/:groupId', authUser, upload.single('groupavatar'), updateGroupInfoController);
/* 
@route: GET /api/conversations/:conversationId
@description: To get details of one specific conversation
*/
conversationRouter.get('/:conversatoinId',authUser,getConversationByIdController);

export default conversationRouter;
