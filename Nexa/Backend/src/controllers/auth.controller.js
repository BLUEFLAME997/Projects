import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export async function userRegisterController(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })

  if (isUserAlreadyExist) {
    return res.status(409).json({
      Message: "User with username or email already exist",
      success: false
    })
  }

  const user = await userModel.create({
    username,
    email,
    password
  })

  const emailVerificationToken = jwt.sign({
    email: email,
    userId: user._id
  })


}

export async function userLoginController(req, res) {
  
  const { email, password } = req.body;
  
  const user = await userModel.findOne({
    email:email
  })
  if(!user){
    return res.status(401).json({
      Message:"Invalid email or password",
      success:false
    })
  }

  const isPasswordMatched = user.comparePassword(password);
  if(!isPasswordMatched){
    return res.status(401).json({
      Message:"Invalid email or password",
      success:false
    })
  }

  const token = jwt.sign({
    email:email,
    id:user._id
  },process.env.JWT_SECRET,{expiresIn:"7d"})

  res.cookie("Nexa_Token",token);
  res.status(200).json({
    Message:"User logged in successfully",
    success:true
  })

}

