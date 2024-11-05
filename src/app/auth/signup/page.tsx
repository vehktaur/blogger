import SignUpForm from '@/components/auth/signup-form';
import ButtonAuth from '@/components/auth/button-auth';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import Link from 'next/link';

const SignUp = () => {
  return (
    <div className='mx-auto max-w-xl'>
      <div className='text-center'>
        <h1 className='mb-3 font-semibold ~text-2xl/4xl'>
          Create your account
        </h1>
        <p className='font-medium text-[#777] ~text-sm/base'>
          Let's get you started with an account
        </p>
      </div>

      <div className='mx-auto mt-8 w-3/4 max-w-md space-y-3 text-sm xl:w-full'>
        <ButtonAuth provider='google'>Sign up with Google</ButtonAuth>
        <ButtonAuth provider='github'>Sign up with Github</ButtonAuth>
      </div>

      <div className='mx-auto my-8 flex w-2/3 max-w-sm items-center justify-center gap-3'>
        <span className='block h-[1px] w-full bg-gray-200' />
        <span>or</span>
        <span className='block h-[1px] w-full bg-gray-200' />
      </div>

      <UseFormContextProvider>
        <SignUpForm />
      </UseFormContextProvider>

      <p className='mx-auto mt-4 max-w-xl font-medium ~text-sm/base'>
        Already have an account?{' '}
        <Link className='text-lime-600' href='/auth/login'>
          Login
        </Link>
      </p>
    </div>
  );
};
export default SignUp;
