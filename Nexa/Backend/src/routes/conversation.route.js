import express from 'express';
import { createPrivateConversationController } from "../controllers/conversation.controller.js";
import { authUser } from '../middleware/auth.middleware.js';

const conversationRouter = express.Router();

conversationRouter.post('/private',authUser,createPrivateConversationController);

export default conversationRouter;