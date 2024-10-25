import Profile from '@/components/personal-info';
import UseFormContextProvider from '@/context/UseFormContextProvider';

const ProfilePage = () => {
  return (
    <UseFormContextProvider>
      <Profile />
    </UseFormContextProvider>
  );
};
export default ProfilePage;
