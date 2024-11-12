import { createUser } from '@/app/actions/auth-actions';
import Users, { User } from '@/lib/models/users';
import { getUser } from '@/lib/server-utils';
import Google, { GoogleProfile } from 'next-auth/providers/google';

const googleProvider = Google({
  async profile(profile: GoogleProfile) {
    let user = await getUser({ email: profile.email });

    if (!user) {
      const firstName = profile.given_name || 'unknown';
      const lastName = profile.family_name;
      const email = profile.email || 'unknown@gmail.com';
      const image = profile.picture;
      const username = profile.given_name || 'unknown';
      let newUser: Partial<User> = {
        firstName,
        lastName,
        email,
        image,
        username,
      };
      await createUser(newUser as User);

      user = await getUser({ email });
    }

    if (user && !user.image) {
      user!.image = profile.picture;
      await Users.findByIdAndUpdate(user._id, { image: profile.picture });
    }

    if (user && !user.name) user.name = profile.name;

    return user!;
  },
});

export default googleProvider;
