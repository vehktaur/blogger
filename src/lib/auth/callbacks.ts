import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

const callbacks = {
  // Get user details from user and assign to token
  jwt({ token, user }: { token: JWT; user?: any }) {
    if (user) {
      // User is available during sign-in
      const { _id, firstName, lastName, username, role } = user;
      token = { ...token, _id, firstName, lastName, username, role };
    }
    return token;
  },
  // Copy user details from the token to session.user
  session({ session, token }: { session: Session; token: JWT }) {
    const { _id, firstName, lastName, username, role } = token;
    session.user = {
      ...session.user,
      _id,
      firstName,
      lastName,
      username,
      role,
    };
    return session;
  },
};

export default callbacks;
