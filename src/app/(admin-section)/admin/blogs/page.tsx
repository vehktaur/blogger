import BlogsTable from '@/components/blogs-table';
import Loading from '@/components/loading';
import SearchInput from '@/components/search-input';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'All Blogs - User Dashboard',
};

const Blogs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const title =
    typeof searchParams.title === 'string' ? searchParams.title : '';

  return (
    <div className='h-full px-5 pb-4 ~pt-5/8'>
      <div className='mx-auto min-h-full max-w-6xl'>
        <header>
          <SearchInput />
          <h1 className='font-medium ~text-lg/xl ~mt-4/6'>All Blogs</h1>
        </header>

        <Suspense key={title} fallback={<Loading />}>
          <BlogsTable title={title} />
        </Suspense>
      </div>
    </div>
  );
};
export default Blogs;
