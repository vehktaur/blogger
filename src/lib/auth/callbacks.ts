import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

const callbacks = {
  jwt({ token, user }: { token: JWT; user?: any }) {
    if (user) {
      // User is available during sign-in
      const { _id, firstName, lastName, role } = user;
      token = { ...token, _id, firstName, lastName, role };
    }
    return token;
  },
  session({ session, token }: { session: Session; token: JWT }) {
    const { _id, firstName, lastName, role } = token;
    session.user = { ...session.user, _id, firstName, lastName, role };
    return session;
  },
};

export default callbacks;
