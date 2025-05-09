import mongoose from 'mongoose';

export const connectTestDB = async () => {
  await mongoose.connect(
    'mongodb+srv://vina:mVF7stUTXnGoHZjH@cluster0.i3fl1.mongodb.net/cicd?retryWrites=true&w=majority&appName=Cluster0',
  );
};

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
