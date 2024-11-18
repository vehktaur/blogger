'use server';

import { ConnectDB } from '@/lib/config/db';
import { Password } from '@/lib/definitions';
import { backendClient } from '@/lib/edgestore-server';
import Users, { User } from '@/lib/models/users';
import { getUser } from '@/lib/server-utils';
import bcrypt from 'bcryptjs';

export const createUser = async (user: User) => {
  try {
    await ConnectDB();

    if (user.password) user.password = await bcrypt.hash(user.password, 10);

    let newUser = await Users.create(user);
    newUser = await getUser({ id: newUser._id });
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

export const updateUser = async (updatedData: Partial<User>, id: string) => {
  try {
    //Connect to DB
    await ConnectDB();

    const user = await Users.findById(id); //Get the blog TBU from to the DB

    if (!user) {
      throw new Error('User does not exist');
    }
    const newUsername = user.username !== updatedData.username;

    Object.assign(user, updatedData); //Update the blog with the values from the updatedData

    await user.save();

    return {
      success: true,
      msg: 'User Updated',
      redirect: newUsername,
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};

export const changePassword = async (data: Password, username: string) => {
  try {
    // Connect to the DB
    await ConnectDB();

    const user = await Users.findOne({ username });

    if (!user) {
      throw new Error('User does not exist');
    }

    if (!user.password) {
      throw new Error('No password credentials found');
    }

    const passwordsMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordsMatch) {
      const log = await bcrypt.hash(data.newPassword!, 10);
      console.log(log);
      throw new Error('Invalid credentials');
    }

    if (data.newPassword) {
      data.newPassword = await bcrypt.hash(data.newPassword, 10);
    } else {
      throw new Error('New password required');
    }

    user.password = data.newPassword;

    await user.save();

    return {
      success: true,
      msg: 'Password changed',
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};

export const changeProfilePic = async (url: string, id?: string) => {
  try {
    // connect to the DB
    await ConnectDB();

    // Get user
    const user = await Users.findById(id);
    if (!user) {
      throw new Error('User does not exist');
    }

    // Confirm new image upload
    await backendClient.userImages.confirmUpload({ url });
    // Delete old image from edgestore
    if (user.image)
      await backendClient.userImages.deleteFile({ url: user.image });

    // Add new image to DB
    user.image = url;
    await user.save();

    return {
      success: true,
      msg: 'Profile pic updated',
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};

export const deleteProfilePic = async (id: string, url?: string | null) => {
  try {
    // connect to the DB
    await ConnectDB();

    // Get user
    const user = await Users.findById(id);
    if (!user) {
      throw new Error('User does not exist');
    }

    // Delete picture from edgestore
    if (url) await backendClient.userImages.deleteFile({ url });
    // Delete old image from edgestore
    if (user.image)
      await backendClient.userImages.deleteFile({ url: user.image });

    user.image = undefined;

    await user.save();

    return {
      success: true,
      msg: 'Profile pic deleted',
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
