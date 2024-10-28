'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import Input from '../ui/input';
import { PersonalInfo as PersonalInfoInterface } from '@/lib/definitions';
import clsx from 'clsx';

const PersonalInfo = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<PersonalInfoInterface>();

  const onSubmit: SubmitHandler<PersonalInfoInterface> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-8'>
        <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
          <Input
            label='First Name'
            name='firstName'
            type='text'
            required={true}
            placeholder='e.g John'
          />
          <Input
            label='Last Name'
            name='lastName'
            type='text'
            placeholder='e.g Doe'
          />
        </div>

        <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
          <Input
            label='Username'
            name='username'
            type='text'
            required={true}
            placeholder='@username'
          />
          <Input
            label='Email Address'
            name='email'
            type='email'
            required={true}
            disabled={true}
            placeholder='user@email.com'
          />
        </div>

        <button
          disabled={isSubmitting}
          type='submit'
          className={clsx(
            isSubmitting && 'text-white',
            'group relative z-[1] inline-block overflow-hidden rounded-3xl border border-black px-6 py-2 font-medium transition-all duration-300 ~text-sm/base hover:text-white',
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
          {isSubmitting ? 'SAVING...' : 'SAVE'}
        </button>
      </div>
    </form>
  );
};
export default PersonalInfo;
