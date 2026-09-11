import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import contactRouter from './routes/contact.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

/* 
@Routes: Authentication api route
*/
app.use('/api/auth',authRouter);
app.use('/api/contact',contactRouter);

export default app