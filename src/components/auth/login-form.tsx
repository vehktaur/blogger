'use client';

import clsx from 'clsx';
import Input from '../ui/input';
import { emailPattern, LoginSchema } from '@/lib/definitions';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const LoginForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<LoginSchema>();

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
  };

  return (
    <form
      className='mx-auto w-full'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className='space-y-5'>
        <Input
          label='Email Address'
          name='email'
          type='email'
          required={true}
          placeholder='user@email.com'
          pattern={{
            value: emailPattern,
            message: 'Enter a valid email',
          }}
        />

        <Input
          label='Password'
          name='password'
          type='password'
          required={true}
          placeholder='password'
        />
      </div>

      <button
        disabled={isSubmitting}
        type='submit'
        className={clsx(
          isSubmitting && 'text-white',
          'group relative z-[1] mx-auto mt-10 block w-full max-w-md overflow-hidden rounded-3xl border border-black px-6 py-2 font-medium transition-all duration-300 ~text-sm/base hover:text-white',
        )}
      >
        <span
          className={clsx(
            isSubmitting
              ? 'w-[calc(100%+2px)]'
              : 'group-hover:w-[calc(100%+2px)]',
            'absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-black transition-all duration-300',
          )}
        />
        {isSubmitting ? 'Login...' : 'Login'}
      </button>
    </form>
  );
};
export default LoginForm;
