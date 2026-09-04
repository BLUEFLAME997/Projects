import { configDotenv } from 'dotenv';
import jwt, { decode } from 'jsonwebtoken';
configDotenv();

export function authUser(req,res,next){
  
  const {Nexa_Token} = req.cookies;
  if(!Nexa_Token){
    return res.status(401).json({
      Message:"Token not provided",
      success:false
    })
  }

  try{
    const decoded = jwt.verify(Nexa_Token,process.env.JWT_SECRET);
    req.user = decoded;
    next();

  }catch(err){
    return res.status(401).json({
      Message:"Unauthorized",
      success:false
    })
  }
}