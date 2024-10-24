import Password from '@/components/password';
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
