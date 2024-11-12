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
      const { email, password } = credentials;

      const user = (await getUser({ email: String(email) })) as User;

      if (!user) {
        throw new Error('User not found');
      }

      if (user.password) {
        const validPassword = await bcrypt.compare(
          password as string,
          user.password,
        );

        if (!validPassword) {
          throw new Error('Invalid credentials');
        }

        console.log(`${user.name} logged in successfully`);
      }

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
});

export default credentialsProvider;
