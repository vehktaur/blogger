import PersonalInfo from '@/components/profile/personal-info';
import UseFormContextProvider from '@/context/UseFormContextProvider';

const ProfilePage = () => {
  return (
    <UseFormContextProvider>
      <PersonalInfo />
    </UseFormContextProvider>
  );
};
export default ProfilePage;
