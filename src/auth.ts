import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     try {
    //       const { email, password } = credentials;

    //       const user = (await getUser({ email: String(email) })) as User;

    //       if (!user) {
    //         throw new Error('User not found');
    //       }

    //       if (user.password) {
    //         const validPassword = await bcrypt.compare(
    //           password as string,
    //           user.password,
    //         );

    //         if (!validPassword) {
    //           throw new Error('Invalid credentials');
    //         }
    //       }

    //       return user;
    //     } catch (error) {
    //       console.log(error);
    //       return null;
    //     }
    //   },
    // }),
    GitHub,
    Google,
  ],
  pages: {
    signIn: '/auth/login',
  },
});
