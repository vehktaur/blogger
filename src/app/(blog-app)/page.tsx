'use client';

import BlogList from '@/app/components/BlogList';
import HomeIntro from '../components/HomeIntro';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmailInput, emailPattern } from '@/lib/definitions';
import { useEffect } from 'react';

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<EmailInput>();


  const onSubmit: SubmitHandler<EmailInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="~text-sm/lg ~pt-12/20">
      <div className="mx-auto max-w-7xl">
        <section className="text-center ~pt-4/6 sm:px-8">
          <HomeIntro />
        </section>

        <section className="px-5 ~mt-3/6 ~mb-8/16">
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
        </section>

        <section className="px-5 ~mb-12/20">
          <BlogList />
        </section>
      </div>
    </div>
  );
}
