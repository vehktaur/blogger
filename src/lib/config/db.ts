import mongoose from 'mongoose';

const apiUrl = process.env.MONGODB_URI;
let isConnected = false;


export const ConnectDB = async () => {
  try {
    if (!apiUrl) {
      console.error('No MongoDB URI found in environment variables.');
      return null;
    }

    // Check if the connection is active before re-connecting
    if (isConnected && mongoose.connection.readyState === 1) {
      console.log('Using existing database connection');
      return mongoose.connection.getClient();
    }

    // Establish the MongoDB connection
    await mongoose.connect(apiUrl);

    isConnected = mongoose.connection.readyState === 1; // Track if connection is successfully established
    console.log('DB connected successfully');
    return mongoose.connection.getClient();
  } catch (error) {
    console.error('Could not connect to DB:', error);

    // Optionally, add a retry mechanism with exponential backoff here if desired
    isConnected = false; // Reset in case of failure
    return null;
  }
};



