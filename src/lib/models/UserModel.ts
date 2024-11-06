import mongoose, { InferSchemaType } from 'mongoose';
import { emailPattern } from '../definitions';

const { Schema, models, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      lowercase: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minLength: 10,
      trim: true,
      lowercase: true,
      match: [emailPattern, 'Please provide a valid email address'],
    },
    emailVerified: {
      type: Date,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

// Model initialization
const UserModel = models?.User || model('User', userSchema);

export type User = InferSchemaType<typeof userSchema> & { _id: string };

export default UserModel;
