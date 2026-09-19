import { configDotenv } from 'dotenv';
import jwt, { decode } from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
configDotenv();

import redis from '../config/cache.js';

export async function authUser(req,res,next){
  
  const {Nexa_Token} = req.cookies;
  if(!Nexa_Token){
    throw new AppError('Token not provided',401);
  }

  const isTokenBlackListed = await redis.get(Nexa_Token);
  if(isTokenBlackListed){
    throw new AppError('Token has been revoked',401);
  }

  try{
    const decoded = jwt.verify(Nexa_Token,process.env.JWT_SECRET);
    req.user = decoded;
    next();

  }catch(err){
    next(new AppError('Unauthorized access',401));
  }
}