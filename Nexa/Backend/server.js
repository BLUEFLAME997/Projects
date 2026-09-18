import { configDotenv } from "dotenv";
import {Server} from 'socket.io';
import app from "./src/app.js";
import connectToDataBase from "./src/config/database.js";
import http from 'http';
configDotenv();

const server = http.createServer(app);
const io = new Server(server);

connectToDataBase();

app.listen(process.env.PORT,()=>{
  console.log("Server running on port 8000..")
})