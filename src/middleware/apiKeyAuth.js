import dotenv from 'dotenv';
dotenv.config();

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res
      .status(403)
      .json({ message: 'Forbidden: Invalid API Key', success: false });
  }
  next(); // API key is valid, proceed to the next middleware
};
export default apiKeyAuth;
