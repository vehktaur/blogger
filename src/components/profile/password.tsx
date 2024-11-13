'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import Input from '../ui/input';
import { Password as PasswordProps } from '@/lib/definitions';
import Button from '../ui/button';
import { changePassword } from '@/app/actions/user-actions';
import { toast } from 'react-toastify';

const Password = ({ username }: { username: string }) => {
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useFormContext<PasswordProps>();

  const onSubmit: SubmitHandler<PasswordProps> = async (data) => {
    console.log(data);
    const res = await changePassword(data, username);
    if (res.success) {
      toast.success(res.msg);
      reset();
    } else {
      toast.error(res.msg);
    }
  };

  const password = watch('newPassword');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8' noValidate>
      <div className='sm:w-1/2 sm:pe-4'>
        <Input
          label='Password'
          name='password'
          type='password'
          required={true}
        />
      </div>

      <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
        <Input label='New Password' name='newPassword' type='password' />
        <Input
          label='Confirm New Password'
          name='confirmPassword'
          type='password'
          validations={{
            passwordsMatch: (value) =>
              value === password || 'Passwords do not match',
          }}
        />
      </div>

      <Button disabled={isSubmitting} type='submit' isSubmitting={isSubmitting}>
        {isSubmitting ? 'SAVE...' : 'SAVE'}
      </Button>
    </form>
  );
};
export default Password;
