import mongoose from 'mongoose';

const apiUrl = process.env.MONGODB_URI;

export const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('DB already connected');
      return mongoose.connection.getClient(); // Already connected
    }

    if (!apiUrl) {
      console.error('No MongoDB URI found in environment variables.');
      return null;
    }

    // Connect to MongoDB with options
    await mongoose.connect(apiUrl);
    console.log('DB connected successfully');

    return mongoose.connection.getClient(); // Return the client for verification
  } catch (error) {
    console.error('Could not connect to DB:', error);
    return null;
  }
};
