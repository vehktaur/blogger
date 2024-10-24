'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Category, Query } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

const HomeSearch = () => {
  const [categories, setCategories] = useState<Category[]>([
    { category: 'All', active: true },
    { category: 'Tech', active: false },
    { category: 'Finance', active: false },
    { category: 'Entertainment', active: false },
    { category: 'Culinary', active: false },
    { category: 'Others', active: false },
  ]);

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

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
  }, [categories, router]);

  return (
    <section className='padding-inline ~py-3/6'>
      <div className='mx-auto flex max-w-7xl flex-col items-center ~mt-8/12 ~gap-6/10 sm:justify-between md:flex-row md:~gap-1/10'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='flex items-stretch shadow-offset'>
            <input
              className='input-base border-black py-2 ~text-sm/base'
              type='email'
              {...register('query')}
              placeholder='Blog title...'
            />
            <button
              className='border border-l-0 border-black px-3 transition-colors duration-300 ~text-sm/base hover:bg-gray-200'
              type='submit'
            >
              Search
            </button>
          </div>
          {errors.query?.message && (
            <p className='error mt-3'>{errors.query?.message}</p>
          )}
        </form>

        <div className='flex max-w-[95%] items-center gap-1 overflow-x-auto scrollbar-none xs:justify-center md:px-0'>
          {categories?.map(({ category }) => (
            <button
              key={category}
              onClick={() => filterBlogs(category)}
              className={clsx(
                'rounded-sm py-1 transition-colors duration-300 ~text-sm/base ~px-2/3 hover:bg-[#444] hover:text-white',
                {
                  'bg-black text-white hover:!bg-black':
                    category.toLowerCase() === activeCategory ||
                    (category === 'All' && !activeCategory),
                },
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HomeSearch;
