import express from 'express';
import { addUserContactController,searchUserController,listUserContactController,deleteUserContactController } from '../controllers/contack.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const contactRouter = express.Router();

/* 
@route: POST /api/contact/:id
@description: To create a contact and add in the list of owner 
*/
contactRouter.post('/add-user/:userId',authUser,addUserContactController);
/* 
@route: GET /api/search    [username = (value)]
@description: To search the user by username
*/
contactRouter.get('/search',authUser,searchUserController);
/* 
@route: GET /api/contact
@description: To get all the user in the contact list
*/
contactRouter.get('/',authUser,listUserContactController);
/* 
@route: DELETE /api/contacts/:userId
@description: To remove the user from the contact list
*/
contactRouter.delete('/:userId',authUser,deleteUserContactController);

export default contactRouter;