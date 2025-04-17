import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
//send otp to user via email
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, // Port number (587 for TLS, 465 for SSL, 25 for non-secure)
  secure: false, // Use TLS (true for SSL)
  auth: {
    user: process.env.SMTP_USER, // Your SMTP username
    pass: process.env.SMTP_PASS, // Your SMTP password
  },
});
