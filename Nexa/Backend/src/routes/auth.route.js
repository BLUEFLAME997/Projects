import express from 'express';
import { userRegisterController, userLoginController, userLogoutController, getMeController ,verifyEmailController} from '../controllers/auth.controller.js';
import { authUser } from '../middleware/auth.middleware.js';
import { registerValidator, loginValidator } from '../validator/auth.validator.js';

const authRouter = express.Router();

/* 
@route: POST /api/auth/register
@description: To register a user in a Database
*/
authRouter.post('/register', registerValidator, userRegisterController);
/* 
@route: GET /api/auth/verify-email
@description: To verify the email of the user
*/
authRouter.get('/verify-email',verifyEmailController);
/* 
@route: POST /api/auth/login
@description: To login a user and provide token
*/
authRouter.post('/login',loginValidator,userLoginController);
/* 
@route: GET /api/auth/get-me
@description: To get the user details with the provided token
*/
authRouter.get('/get-me',authUser,getMeController);
/* 
@route: GET /api/auth/logout
@description: To logout user and blacklist the jwt token
*/
authRouter.get('/logout',authUser,userLogoutController);

export default authRouter;