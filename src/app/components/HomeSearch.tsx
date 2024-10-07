'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Category, Query } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const HomeSearch = () => {
  const [categories, setCategories] = useState<Category[]>([
    { category: 'All', active: true },
    { category: 'Tech', active: false },
    { category: 'Finance', active: false },
    { category: 'Entertainment', active: false },
    { category: 'Culinary', active: false },
    { category: 'Others', active: false },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Query>();

  const onSubmit: SubmitHandler<Query> = (data) => {
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

  const router = useRouter();
  useEffect(() => {
    const activeCategory = categories
      .find((category) => category.active)
      ?.category.toLowerCase();
    if (activeCategory === 'all') {
      router.push('/');
    } else {
      router.push(`/?category=${activeCategory}`);
    }
  }, [categories]);

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
            {...register('query')}
            placeholder="Enter your email"
          />
          <button
            className="border border-l-0 border-black transition-colors duration-300 ~px-3/6 hover:bg-gray-200"
            type="submit"
          >
            Subscribe
          </button>
        </div>
        {errors.query?.message && (
          <p className="error mt-3">{errors.query?.message}</p>
        )}
      </form>

      <div className="flex items-center justify-center ~mt-8/12 ~gap-1/2">
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
