import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ pat: '.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
