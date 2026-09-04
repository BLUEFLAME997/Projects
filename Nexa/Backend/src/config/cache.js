import { configDotenv } from 'dotenv';
import { createClient } from 'redis';
configDotenv();

const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  },
  password:process.env.REDIS_PASSWORD
})

redis.on('connect',()=>{
  console.log("Server connected to redis")
})

redis.on('error',(err)=>{
  console.log("Redis error: ",err);
})

await redis.connect();

export default redis;