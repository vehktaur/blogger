import LoginForm from '@/components/auth/login-form';
import ButtonAuth from '@/components/auth/button-auth';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Logs',
  description: 'Login to Logs',
};

const Login = () => {
  return (
    <div className='mx-auto max-w-md'>
      <div className='text-center'>
        <h1 className='mb-3 font-semibold ~text-2xl/4xl'>Welcome Back!</h1>
        <p className='font-medium text-[#777] ~text-sm/base'>
          Let&#39;s get you logged in hehehe
        </p>
      </div>

      <div className='mx-auto mt-8 w-3/4 max-w-md space-y-3 text-sm xl:w-full'>
        <ButtonAuth provider='google'>Continue with Google</ButtonAuth>
        <ButtonAuth provider='github'>Continue with Github</ButtonAuth>
      </div>

      <div className='mx-auto my-8 flex w-2/3 max-w-sm items-center justify-center gap-3'>
        <span className='block h-[1px] w-full bg-gray-200' />
        <span>or</span>
        <span className='block h-[1px] w-full bg-gray-200' />
      </div>

      <UseFormContextProvider>
        <LoginForm />
      </UseFormContextProvider>

      <p className='mx-auto mt-4 max-w-xl font-medium ~text-sm/base'>
        Don&#39;t have an account?{' '}
        <Link className='text-lime-600' href='/auth/sign-up'>
          Sign up
        </Link>
      </p>
    </div>
  );
};
export default Login;
