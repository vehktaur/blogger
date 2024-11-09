import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUser } from './lib/server-utils';
import { User } from './lib/models/UserModel';

const getFakeUser = () => {
  let user = {
    firstName: 'Victor',
    lastName: 'Akhihiero',
    name: 'Victor Akhihiero',
    email: 'victorakhihiero@gmail.com',
    username: 'vehktaur',
    _id: '',
    role: 'user',
    password: '$2a$10$IUq8yxxA/NlCeNZs08pSg.khLNob9KLA6eTLM3j.uaqRA5SaKRAgi',
    createdAt: new Date('2024-11-02T10:49:26.345+00:00'),
    updatedAt: new Date('2024-11-02T10:49:26.345+00:00'),
  };

  return user;
};

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

            console.log('worked');
            console.log(user.name);
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
