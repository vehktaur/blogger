import mongoose from 'mongoose';

const apiUrl = process.env.MONGODB_URI;

const connection = { isConnected: 0 };

export const ConnectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('DB already connected');
      return;
    }

    const db = await mongoose.connect(apiUrl!);
    console.log('DB connected successful');

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log('Could not connect to DB');
    throw new Error(`${error}`);
  }
};

