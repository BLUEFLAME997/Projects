import { configDotenv } from "dotenv";
configDotenv();

import mongoose from "mongoose";

async function connectToDataBase() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Server connected to database")
}

export default connectToDataBase;