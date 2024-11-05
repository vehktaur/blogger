'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { emailPattern, SignUpSchema } from '@/lib/definitions';
import Input from '../ui/input';
import clsx from 'clsx';
import { signUp } from '@/app/actions/auth';
import { toast } from 'react-toastify';
import { User } from '@/lib/models/UserModel';

const SignUpForm = () => {
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useFormContext<SignUpSchema>();

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    const { confirmPassword, ...user } = data;

    const response = await signUp(user as User);

    if (response.success) {
      toast.success(response.msg);
    } else {
      toast.error(response.msg);
    }
  };

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-5'>
        <div className='flex flex-col items-start justify-between gap-5 sm:flex-row'>
          <Input
            label='First Name'
            name='firstName'
            required={{ star: true }}
            placeholder='e.g John'
          />
          <Input label='Last Name' name='lastName' placeholder='e.g Doe' />
        </div>

        <div className='flex flex-col items-start justify-between gap-5 sm:flex-row'>
          <Input
            label='Username'
            name='username'
            required={{ star: true }}
            placeholder='@username'
          />
          <Input
            label='Email Address'
            name='email'
            type='email'
            required={{ star: true }}
            placeholder='user@email.com'
            pattern={{
              value: emailPattern,
              message: 'Enter a valid email',
            }}
          />
        </div>

        <div className='flex flex-col items-start justify-between gap-5 sm:flex-row'>
          <Input
            label='Password'
            name='password'
            type='password'
            required={{ star: true }}
            placeholder='p*ssword'
            minLength={{
              value: 6,
              message: 'Password must be at least 6 characters',
            }}
          />
          <Input
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            placeholder='same same'
            required={{ star: true }}
            validations={{
              equalPassword: (value) =>
                value === password || 'Passwords do not match',
            }}
          />
        </div>
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
        {isSubmitting ? 'Sign Up...' : 'Sign Up'}
      </button>
    </form>
  );
};
export default SignUpForm;
