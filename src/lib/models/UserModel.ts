import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Date,
  },
  password: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const UserModel = models.User || model('User', userSchema);

export default UserModel;
