import mongoose from 'mongoose';

const apiUrl = process.env.MONGODB_URI;
const connection = { isConnected: mongoose.connection?.readyState };


export const ConnectDB = async () => {
  try {
    // if (connection.isConnected === 1) {
    //   console.log('DB already connected');
    //   return mongoose.connection.getClient(); // Return the MongoDB client if already connected
    // }

    await mongoose.connect(apiUrl!); // Establish the connection
    console.log('DB connected successfully');

   // connection.isConnected = mongoose.connection.readyState;
  //  return mongoose.connection.getClient(); // Return the MongoDB client
  } catch (error) {
    console.log('Could not connect to DB');
    console.log(error);
  }
};
