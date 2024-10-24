import Profile from '@/components/profile';
import UseFormContextProvider from '@/context/UseFormContextProvider';

const ProfilePage = () => {
  return (
    <UseFormContextProvider>
      <Profile />
    </UseFormContextProvider>
  );
};
export default ProfilePage;
