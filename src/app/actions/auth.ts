'use server';

import { ConnectDB } from '@/lib/config/db';
import UserModel, { User } from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';

export const signUp = async (user: User) => {
  try {
    await ConnectDB();

    if (user.password) user.password = await bcrypt.hash(user.password, 10);

    await UserModel.create(user);
    return {
      success: true,
      msg: 'User created',
    };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};
