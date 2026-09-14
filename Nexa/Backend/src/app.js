import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route.js';
import contactRouter from './routes/contact.route.js';
import conversationRouter from './routes/conversation.route.js';
import handleError from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(handleError);

/* 
@Routes: Authentication api route
*/
app.use('/api/auth',authRouter);
/* 
@Routes: Contact api route
*/
app.use('/api/contact',contactRouter);
/* 
@Route: Conversation api route
*/
app.use('/api/conversation',conversationRouter);

export default app