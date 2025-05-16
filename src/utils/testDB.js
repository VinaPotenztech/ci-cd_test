import mongoose from 'mongoose';

export const connectTestDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://vina:mVF7stUTXnGoHZjH@cluster0.i3fl1.mongodb.net/cicd?retryWrites=true&w=majority&appName=Cluster0',
    );
    console.log('🟢 Connected to test MongoDB');
  } catch (err) {
    console.error('🔴 Failed to connect to test DB', err);
    process.exit(1);
  }
};

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export const clearTestDB = async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    console.log('🧹 Cleared all collections');
  } catch (err) {
    console.error('🔴 Failed to clear test DB', err);
  }
};
