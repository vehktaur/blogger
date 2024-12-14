'use client';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchInput = () => {
  // State to hold the search query
  const [search, setSearch] = useState('');

  // router to push/set the query params
  const router = useRouter();

  useEffect(() => {
    // Side effect to handle setting and clearing the searchParams
    if (search !== '') {
      router.push(`/blogs?title=${search}`);
    } else {
      router.push('/blogs');
    }
  }, [search, router]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search...'
        />
      </div>
    </div>
  );
};
export default SearchInput;
