import { createUser } from '@/app/actions/auth-actions';
import Users, { User } from '@/lib/models/users';
import { getUser } from '@/lib/server-utils';
import GitHub, { GitHubProfile } from 'next-auth/providers/github';

const githubProvider = GitHub({
  async profile(profile: GitHubProfile) {
    // Get user details from the DB
    let user = await getUser({ email: profile.email! });

    //Create a new user if the user doesn't already exist (in the DB)
    if (!user) {
      const name = profile.name?.split(' ');
      const firstName = name?.[0] || 'unknown';
      const lastName = name?.[1];
      const email = profile.email || 'unknown@gmail.com';
      const image = profile.avatar_url;
      const username = profile.login || 'unknown';
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

    // Update the users image if no image in the DB
    if (user && !user.image) {
      user!.image = profile.avatar_url;
      await Users.findByIdAndUpdate(user._id, { image: profile.avatar_url });
    }

    // Add user name
    if (user && !user.name) user.name = profile.name || 'unknown';

    return user!;
  },
});

export default githubProvider;
