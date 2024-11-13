'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { emailPattern, SignUpSchema } from '@/lib/definitions';
import Input from '../ui/input';
import clsx from 'clsx';
import { createUser } from '@/app/actions/auth-actions';
import { toast } from 'react-toastify';
import { User } from '@/lib/models/users';
import Button from '../ui/button';

const SignUpForm = () => {
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useFormContext<SignUpSchema>();

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    const { confirmPassword, ...user } = data;

    const response = await createUser(user as User);

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

      <Button
        className='mx-auto mt-10 w-full max-w-md'
        disabled={isSubmitting}
        type='submit'
        isSubmitting={isSubmitting}
      >
        {isSubmitting ? 'Sign Up...' : 'Sign Up'}
      </Button>
    </form>
  );
};
export default SignUpForm;
