import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GitHub, { GitHubProfile } from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUser } from './lib/server-utils';
import { User as CustomUser } from './lib/models/users';
import { DefaultSession } from 'next-auth';
import { signUp } from './app/actions/auth';

declare module 'next-auth' {
  interface Session {
    user: CustomUser & DefaultSession['user'];
  }

  interface User extends CustomUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends CustomUser {}
}

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

          const user = (await getUser({ email: String(email) })) as CustomUser;

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
    GitHub({
      async profile(profile) {
        let user = await getUser({ email: profile.email! });
        if (!user) {
          const name = profile.name?.split(' ');
          const firstName = name?.[0] || 'Unknown';
          const lastName = name?.[1];
          const email = profile.email;
          const image = profile.avatar_url;
          let newUser = { firstName, lastName, email, image };
          user = (await signUp(newUser as CustomUser)).user;
        }

        if (user && !user.image) user!.image = profile.avatar_url;

        if (user && !user.name)
          user.name = `${user.firstName} ${user.lastName}`;

        return { ...user! };
      },
    }),
    Google,
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        const { _id, firstName, lastName, role } = user;
        token = { ...token, _id, firstName, lastName, role };
      }
      return token;
    },
    session({ session, token }) {
      const { _id, firstName, lastName, role } = token;
      session.user = { ...session.user, _id, firstName, lastName, role };
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});
