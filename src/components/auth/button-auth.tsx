import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import clsx from 'clsx';
import { signIn } from '@/auth';

const ButtonAuth = ({
  className,
  children,
  provider,
}: {
  className?: string;
  children: React.ReactNode;
  provider: 'google' | 'github';
}) => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider, { redirectTo: '/' });
      }}
    >
      <button
        type='submit'
        className={clsx(
          'flex w-full items-center justify-center gap-2 rounded-full border border-[#999] px-4 font-medium transition-colors duration-300 ~py-2/2.5 hover:bg-gray-200',
          className,
        )}
      >
        {provider === 'google' && <FcGoogle className='~size-4/5' />}
        {provider === 'github' && <FaGithub className='~size-4/5' />}
        {children}
      </button>
    </form>
  );
};
export default ButtonAuth;
