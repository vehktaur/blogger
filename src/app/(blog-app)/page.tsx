'use client';

import BlogList from '@/app/components/BlogList';
import HomeIntro from '../components/HomeIntro';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmailInput } from '@/lib/definitions';

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EmailInput>();
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit: SubmitHandler<EmailInput> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="~text-sm/lg ~pt-12/24">
      <div className="max-w-7xl mx-auto">
        <section className="text-center sm:px-8 ~pt-4/6">
          <HomeIntro />
        </section>

        <section className="px-5  ~mb-8/16 ~mt-6/10">
          <form
            className=" min-w-[260px] w-4/5 max-w-[35rem] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex items-stretch shadow-offset">
              <input
                className="~px-3/4 ~py-2.5/3 border border-black w-full outline-none"
                type="email"
                {...register('email', {
                  required: 'The email field is required',
                  pattern: {
                    value: emailPattern,
                    message: 'Please enter a valid email'
                  }
                })}
                placeholder="Enter your email"
              />
              <button
                className="border border-black border-l-0 ~px-3/6 hover:bg-gray-200 transition-colors duration-300"
                type="submit"
              >
                Subscribe
              </button>
            </div>
            {errors.email?.message && (
              <p className="mt-3 text-sm text-red-700">
                {errors.email?.message}
              </p>
            )}
          </form>
        </section>

        <section className="~mb-12/20 px-5 ">
          <BlogList />
        </section>
      </div>
    </div>
  );
}
