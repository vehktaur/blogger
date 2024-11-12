import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { User as CustomUser } from './lib/models/users';
import { DefaultSession } from 'next-auth';
import authOptions from './lib/auth/options';

declare module 'next-auth' {
  interface Session {
    user: CustomUser & DefaultSession['user'];
  }

  interface User extends CustomUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends CustomUser {}
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
