import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export async function userRegisterController(req,res){
  const {username,email,password} = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if(isUserAlreadyExist){
    return res.status(409).json({
      Message:"User with username or email already exist",
      success:false
    })
  }

  const user = await userModel.create({
    username,
    email,
    password
  })

  const emailVerificationToken = jwt.sign({
    email:email,
    userId:user._id
  })

  
}