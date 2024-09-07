import mongoose from 'mongoose';

const apiUrl = process.env.DATABASE_URL;

export const ConnectDB = async () => {
  await mongoose.connect(apiUrl!);
};
