'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import Input from '../ui/input';
import { PersonalInfo as PersonalInfoProps } from '@/lib/definitions';
import Button from '../ui/button';
import { User } from '@/lib/models/users';
import { updateUser } from '@/app/actions/user-actions';
import { toast } from 'react-toastify';

const PersonalInfo = ({ user }: { user: User }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<PersonalInfoProps>();

  const onSubmit: SubmitHandler<PersonalInfoProps> = async (data) => {
    console.log(data);
    const res = await updateUser(data, user._id);

    if (res.success) {
      toast.success(res.msg);
      if (res.redirect) {
        window.location.reload();
      }
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-8'>
        <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
          <Input
            label='First Name'
            name='firstName'
            required={true}
            placeholder='e.g John'
          />
          <Input label='Last Name' name='lastName' placeholder='e.g Doe' />
        </div>

        <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
          <Input
            label='Username'
            name='username'
            required={true}
            placeholder='@username'
          />
          <Input
            label='Email Address'
            name='email'
            type='email'
            required={true}
            disabled
            placeholder={user.email}
          />
        </div>

        <Button
          disabled={isSubmitting}
          type='submit'
          isSubmitting={isSubmitting}
        >
          {isSubmitting ? 'SAVING...' : 'SAVE'}
        </Button>
      </div>
    </form>
  );
};
export default PersonalInfo;
