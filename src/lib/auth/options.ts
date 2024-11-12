import { NextAuthConfig } from 'next-auth';
import callbacks from './callbacks';
import credentialsProvider from './providers/credentials-provider';
import githubProvider from './providers/github-provider';
import googleProvider from './providers/google-provider';

const authOptions: NextAuthConfig = {
  providers: [credentialsProvider, githubProvider, googleProvider],
  callbacks,
  pages: {
    signIn: '/auth/login',
  },
};

export default authOptions;
