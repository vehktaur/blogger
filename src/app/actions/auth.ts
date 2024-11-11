'use server';

import { ConnectDB } from '@/lib/config/db';
import Users, { User } from '@/lib/models/users';
import bcrypt from 'bcryptjs';

export const signUp = async (user: User) => {
  try {
    await ConnectDB();

    if (user.password) user.password = await bcrypt.hash(user.password, 10);

    const newUser = await Users.create(user);
    return {
      success: true,
      msg: 'User created',
      user: newUser,
    };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};
