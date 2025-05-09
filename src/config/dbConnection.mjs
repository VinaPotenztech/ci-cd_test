import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://vina:mVF7stUTXnGoHZjH@cluster0.i3fl1.mongodb.net/cicd?retryWrites=true&w=majority&appName=Cluster0',
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
