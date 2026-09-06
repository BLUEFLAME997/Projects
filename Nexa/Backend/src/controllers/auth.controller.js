import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import redis from "../config/cache.js";
import { sendEmail } from "../services/mail.service.js";

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
  }, process.env.JWT_SECRET, { expiresIn: "1h" })

  await sendEmail({
    to: email,
    subject: 'welcome to Nexa',
    html: `
    <h1>Welcome to Nexa</h1>
    <p>Click the link below to verify your email</p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Best regards,<br>Nexa Team</p>`
  })

  res.status(201).json({
    Message: "User registered successfully",
    success: true
  })
}

export async function verifyEmailController(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      Message: "Token is required",
      success: false
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        Message: "User not found",
        success: false
      })
    }

    user.verified = true;
    await user.save();

    const Token = jwt.sign({
      email: decoded.email,
      id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("Nexa_Token", Token);

    const html = `
    <h1>Email Verified</h1>
    <p>Your email has been successfully verified. You can now log in to your account.</p>
    <p>Best regards,<br>Nexa Team</p>
    `;

    res.send(html);

  } catch (error) {
    return res.status(400).json({
      Message: "Invalid token",
      success: false
    })
  }
}

export async function userLoginController(req, res) {

  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email
  })
  if (!user) {
    return res.status(401).json({
      Message: "Invalid email or password",
      success: false
    })
  }

  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({
      Message: "Invalid email or password",
      success: false
    })
  }

  const token = jwt.sign({
    email: email,
    id: user._id
  }, process.env.JWT_SECRET, { expiresIn: "7d" })

  res.cookie("Nexa_Token", token);
  res.status(200).json({
    Message: "User logged in successfully",
    success: true
  })

}

export async function getMeController(req, res) {
  const userId = req.user.id;
  const { Nexa_Token } = req.body;

  const user = await userModel.findOne(userId);
  if (!user) {
    return res.status(404).json({
      Message: "User not found",
      success: false
    })
  }

  res.status(200).json({
    Message: "User data fetched successfully",
    success: true,
    user
  })
}

export async function userLogoutController(req, res) {

  const { Nexa_Token } = req.body;
  if (!Nexa_Token) {
    return res.status(401).json({
      Message: "Unauthorized",
      success: false
    })
  }

  const decoded = jwt.decode(Nexa_Token);

  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const remainingTime = decoded.exp - currentTimeStamp;

  const redisResponse = await redis.set(Nexa_Token, Date.now().toString(), "Ex", remainingTime);

  res.clearCookie('Nexa_Token');
  res.status(200).json({
    Message: "User logged out successfully",
    success: true
  })
}
