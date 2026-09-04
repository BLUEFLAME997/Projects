import { configDotenv } from "dotenv";
configDotenv();

import app from "./src/app.js";
import connectToDataBase from "./src/config/database.js";

connectToDataBase();

app.listen(process.env.PORT,()=>{
  console.log("Server running on port 8000..")
})