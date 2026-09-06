import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" 
);

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  return transporter;
}

export async function sendEmail({ to, subject, html, text }) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text
  };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent: ", details);
}