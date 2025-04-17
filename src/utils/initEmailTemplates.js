import EmailTamplate from '../models/emailTemplate.model.js';
import dotenv from 'dotenv';
dotenv.config();
const saveDefaultTemplates = async () => {
  await EmailTamplate.findOneAndUpdate(
    { name: 'Employer Login Email' }, // Search criteria
    {
      name: 'Employer Login Email',
      fromEmail: process.env.FROM_EMAIL,
      subject: 'Your login link - Valid for 5 minutes',
      body: `<p>For your security, we use email-based login to ensure the safety of your account. 
      If you did not attempt to log in, you can safely disregard this message. 
      The login request will automatically expire in 5 minutes.</p>
      
      <p>If you did request to log in, simply click the link below to access your account.</p>
      
      <p><a href="{employer-login-link-valid-5-minutes}" style="color: #007bff; text-decoration: none; font-weight: bold;">Log in to Your Account</a></p>
    `,
      editableByEmployer: true,
    },
  );
};

export default saveDefaultTemplates;
