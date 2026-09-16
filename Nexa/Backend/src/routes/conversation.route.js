import express from 'express';
import {
  createPrivateConversationController, createGroupConversationController, createAiConversationController, getAllMyConversatoinController, updateGroupInfoController, getConversationByIdController, addUserInGroupController, removeUserFromGroupController
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
conversationRouter.get('/:conversatoinId', authUser, getConversationByIdController);
/* 
@route: POST /api/conversations/:conversationId/members
@description: To add a user in a group
*/
conversationRouter.post('/:conversatoinId/members',authUser,addUserInGroupController);
/* 
@route: DELETE /api/conversations/:conversationId/members/:userId
@description: To remove a user from a group
*/
conversationRouter.delete('/:conversationId/members/:userId',authUser,removeUserFromGroupController);

export default conversationRouter;
