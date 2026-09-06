import { configDotenv } from "dotenv";
configDotenv();
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    type:'OAuth2',
    user:process.env.GOOGLE_USER,
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    refreshToken:process.env.GOOGLE_REFRESH_TOKEN
  }
})

transporter.verify()
          .then(()=>{
            console.log("Server connected to the SMTP server");
          }).catch((err)=>{
            console.log('Error SMTP server: ',err);
          })

export async function sendEmail({to,subject,html,text}){
  
  const mailOptions = {
    from:process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text
  }

  const details = await transporter.sendMail(mailOptions);
  console.log("Email send: ",details);
}