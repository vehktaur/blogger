import mongoose from 'mongoose';

const apiUrl = process.env.DATABASE_URL;

export const ConnectDB = async () => {
  await mongoose.connect(apiUrl!);
  console.log('DB connected successful');
};

// global.d.ts
// declare global {
//   var mongoose: {
//     conn: any;
//     promise: Promise<any> | null;
//   };
// }

// const MONGODB_URI = process.env.DATABASE_URL;

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local',
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;
