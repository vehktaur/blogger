import PersonalInfo from '@/components/profile/personal-info';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import { getUser } from '@/lib/server-utils';

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user = await getUser({ username });

  if (!user) {
    return;
  }

  const usersPersonalInfo = {
    firstName: user.firstName,
    lastName: user?.lastName,
    username: user.username,
    email: user.email,
  };

  return (
    <UseFormContextProvider defaultValues={usersPersonalInfo}>
      <PersonalInfo user={user} />
    </UseFormContextProvider>
  );
};
export default ProfilePage;
