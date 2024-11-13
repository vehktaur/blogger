import Password from '@/components/profile/password';
import UseFormContextProvider from '@/context/UseFormContextProvider';

const PasswordPage = async ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <UseFormContextProvider>
        <Password username={params.username} />
      </UseFormContextProvider>
    </div>
  );
};
export default PasswordPage;
