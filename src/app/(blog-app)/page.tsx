"use client";

import BlogList from "@/app/components/BlogList";
import HomeIntro from "../components/HomeIntro";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailInput } from "@/lib/definitions";

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailInput>();
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit: SubmitHandler<EmailInput> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="~text-sm/lg ~pt-12/24">
      <div className="mx-auto max-w-7xl">
        <section className="text-center ~pt-4/6 sm:px-8">
          <HomeIntro />
        </section>

        <section className="px-5 ~mt-6/10 ~mb-8/16">
          <form
            className="mx-auto w-4/5 min-w-[260px] max-w-[35rem]"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex items-stretch shadow-offset">
              <input
                className="w-full border border-black outline-none ~px-3/4 ~py-2.5/3"
                type="email"
                {...register("email", {
                  required: "The email field is required",
                  pattern: {
                    value: emailPattern,
                    message: "Please enter a valid email",
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
              <p className="mt-3 text-sm text-red-700">
                {errors.email?.message}
              </p>
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
