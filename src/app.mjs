import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/dbConnection.mjs';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/api/users', userRoutes);

// Only for local testing (not in Lambda)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running on port ${port}`);
  });
} else {
  await connectDB(); // Only needed once for the Lambda lifecycle
}

const server = serverless(app);
export default app;
export const lambdaHandler = server;
