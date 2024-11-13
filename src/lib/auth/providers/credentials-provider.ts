import Credentials from 'next-auth/providers/credentials';

import { User } from '@/lib/models/users';
import { getUser } from '@/lib/server-utils';
import bcrypt from 'bcryptjs';

const credentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    try {
      // Get email and password from login credentials
      const { email, password } = credentials;

      // Get user details from the DB
      const user = (await getUser({ email: String(email) })) as User;

      // Check if user actually exists
      if (!user) {
        throw new Error('User not found');
      }

      // Confirm user password is correct
      if (user.password) {
        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        );

        if (!passwordsMatch) {
          throw new Error('Invalid credentials');
        }

        console.log(`${user.name} logged in successfully`);
      }

      //return user details
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
});

export default credentialsProvider;
