// scripts/seedAiUser.js — run this ONCE, manually
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import { configDotenv } from "dotenv";
configDotenv();

async function seedAiUser() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await userModel.findOne({ isBot: true });
  if (existing) {
    console.log("AI user already exists:", existing._id);
    return process.exit(0);
  }

  const aiUser = await userModel.create({
    username: "Nexa AI",
    email: "ai@nexa.internal", // dummy placeholder, won't actually be used for login
    isBot: true,
    verified: true,
    password:"ai123123"
    // no real password needed since this "user" never logs in
  });

  console.log("AI user created with ID:", aiUser._id);
  process.exit(0);
}

seedAiUser();
