import Password from '@/components/profile/password';
import UseFormContextProvider from '@/context/UseFormContextProvider';

const PasswordPage = async (props: { params: Promise<{ username: string }> }) => {
  const params = await props.params;
  return (
    <div>
      <UseFormContextProvider>
        <Password username={params.username} />
      </UseFormContextProvider>
    </div>
  );
};
export default PasswordPage;
