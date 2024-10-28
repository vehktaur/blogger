import Password from '@/components/profile/password';
import UseFormContextProvider from '@/context/UseFormContextProvider';

const PasswordPage = () => {
  return (
    <div>
      <UseFormContextProvider>
        <Password />
      </UseFormContextProvider>
    </div>
  );
};
export default PasswordPage;
