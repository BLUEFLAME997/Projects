import { configDotenv } from 'dotenv';
import jwt, { decode } from 'jsonwebtoken';
configDotenv();

import redis from '../config/cache.js';

export async function authUser(req,res,next){
  
  const {Nexa_Token} = req.cookies;
  if(!Nexa_Token){
    return res.status(401).json({
      Message:"Token not provided",
      success:false
    })
  }

  const isTokenBlackListed = await redis.get(Nexa_Token);
  if(isTokenBlackListed){
    return res.status()
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