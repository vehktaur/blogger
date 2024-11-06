import mongoose from 'mongoose';

const apiUrl = process.env.MONGODB_URI;

export const ConnectDB = async () => {
  try {
    if (!apiUrl) {
      console.error('No MongoDB URI found in environment variables.');
      return null;
    }

    await mongoose.connect(apiUrl);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Could not connect to DB:', error);
    return null;
  }
};
