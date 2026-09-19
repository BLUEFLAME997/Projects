import { configDotenv } from "dotenv";
import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken';
import cookie from 'cookie'
import redis from "../config/cache.js";

configDotenv();

export async function socketAuthMiddleware(socket,next){
  const raw = socket.handshake.headers.cookie;

  if(!raw){
    return next(new AppError('No cookies',401));
  }
  const cookies = cookie.parse(raw);

  const token = cookies.NEXA_TOKEN;
  if(!token){
    return next(new AppError("No token provided",401));
  }
  
  const isTokenBlackListed = await redis.get(token);
  if(isTokenBlackListed){
    return next(new AppError('Token has been revoked',401));
  }

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  }catch(err){
    return next(new AppError('Invalid or expired token provided',401));
  }
}