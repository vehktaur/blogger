'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Category, EmailInput, emailPattern } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const HomeSearch = () => {
  const [categories, setCategories] = useState<Category[]>([
    { category: 'All', active: true },
    { category: 'Technology', active: false },
    { category: 'Startup', active: false },
    { category: 'Lifestyle', active: false },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<EmailInput>();

  const onSubmit: SubmitHandler<EmailInput> = (data) => {
    console.log(data);
  };

  const filterBlogs = (category: string) => {
    setCategories(
      categories.map((currentCategory) =>
        currentCategory.category === category
          ? { ...currentCategory, active: true }
          : { ...currentCategory, active: false },
      ),
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div>
      <form
        className="mx-auto w-4/5 min-w-[260px] max-w-[35rem]"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex items-stretch shadow-offset">
          <input
            className="input-base border-black"
            type="email"
            {...register('email', {
              required: 'The email field is required',
              pattern: {
                value: emailPattern,
                message: 'Please enter a valid email',
              },
            })}
            placeholder="Enter your email"
          />
          <button
            className="border border-l-0 border-black transition-colors duration-300 ~px-3/6 hover:bg-gray-200"
            type="submit"
          >
            Subscribe
          </button>
        </div>
        {errors.email?.message && (
          <p className="error mt-3">{errors.email?.message}</p>
        )}
      </form>

      <div className="flex items-center justify-center ~gap-1/2">
        {categories.map(({ category, active }) => (
          <button
            key={category}
            onClick={() => filterBlogs(category)}
            className={clsx(
              'rounded-sm py-1 transition-colors duration-300 ~px-2/3 hover:bg-[#444] hover:text-white',
              { 'bg-black text-white hover:!bg-black': active },
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
export default HomeSearch;
