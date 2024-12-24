'use client';
import { CiSearch } from 'react-icons/ci';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = () => {
  const { replace } = useRouter(); // replace to set the query params
  const pathname = usePathname();
  const searchParams = useSearchParams(); // get current searchParams

  const createQueryString = useCallback(
    (title: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (title === '') {
        params.delete('title');
      } else {
        params.set('title', title);
      }

      return params.toString();
    },
    [searchParams],
  );

  const updateTitleParam = useDebouncedCallback((title: string) => {
    replace(`${pathname}?${createQueryString(title)}`, {
      scroll: false,
    });
  });

  return (
    <div className='flex items-center justify-between gap-2 sm:justify-start sm:gap-4'>
      <div className='relative'>
        <span className='absolute left-0 h-full content-center'>
          <CiSearch className='text-[#B0B0B0] ~w-5/6' />
        </span>

        <input
          className='h-full border-b border-b-stone-500 py-2 text-sm outline-none ~ps-6/8 ~pe-1/2'
          type='search'
          name='search'
          onChange={(e) => updateTitleParam(e.target.value)}
          placeholder='Search...'
          defaultValue={searchParams.get('title')?.toString() || ''}
        />
      </div>
    </div>
  );
};
export default SearchInput;
