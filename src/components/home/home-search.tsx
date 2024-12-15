'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Query } from '@/lib/definitions';
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const HomeSearch = () => {
  const pathname = usePathname(); // get current path
  const router = useRouter(); // router to push the search params
  const searchParams = useSearchParams(); // get current search params
  const activeCategory = searchParams.get('category') ?? 'all'; // get the category searchParam (defaults to "all")

  // Declare list of categories to show and toggle between
  const categories = [
    'All',
    'Tech',
    'Lifestyle',
    'Finance',
    'Entertainment',
    'Culinary',
    'Others',
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Query>(); // Set up RHF for Search function

  const onSubmit: SubmitHandler<Query> = (data) => {
    console.log(data);
  };

  // This function takes a category and updates the searchParams with it
  const createQueryString = useCallback(
    (category: string) => {
      // get current query params
      const params = new URLSearchParams(searchParams.toString());

      // update category in searchParams as required
      if (category === 'all') {
        params.delete('category');
      } else {
        params.set('category', category);
      }

      // return the updated searchParams
      return params.toString();
    },
    [searchParams],
  );

  const updateCategoryParam = (category: string) => {
    // update the URL with the search params
    router.push(`${pathname}?${createQueryString(category)}`);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className='padding-inline ~py-3/6'>
      <div className='mx-auto flex max-w-7xl flex-col items-center ~mt-8/12 ~gap-6/10 sm:justify-between md:flex-row'>
        <form
          className='flex-shrink-0'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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

        <div className='flex max-w-[95%] items-center gap-1 overflow-x-auto scrollbar-none md:px-0'>
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => updateCategoryParam(category.toLowerCase())}
              className={cn(
                'rounded-sm py-1 transition-colors duration-300 ~text-sm/base ~px-2/3 hover:bg-[#444] hover:text-white',
                {
                  'bg-black text-white hover:bg-black':
                    category.toLowerCase() === activeCategory,
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
