import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUser } from './lib/server-utils';
import { User } from './lib/models/UserModel';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;

          const user = (await getUser({ email: String(email) })) as User;

          // const user = getFakeUser();

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
    }),
    GitHub,
    Google,
  ],
  pages: {
    signIn: '/auth/login',
  },
});
