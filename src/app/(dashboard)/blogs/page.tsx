import BlogsTable from '@/components/blogs/blogs-table';
import Loading from '@/components/layout/loading';
import SearchInput from '@/components/ui/search-input';
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
  // Get title from search params and pass to blog table for querying
  const title = searchParams.title?.toString() || '';

  return (
    <div className='h-full px-5 pb-4 ~pt-5/8'>
      <div className='mx-auto min-h-full max-w-6xl'>
        <header>
          {/* Search input for querying the blog table (Sets the search params)*/}
          <SearchInput />

          {/* Page heading */}
          <h1 className='font-medium ~text-lg/xl ~mt-4/6'>All Blogs</h1>
        </header>

        {/* Blog Table to Display User's blogs */}
        <Suspense key={title} fallback={<Loading />}>
          <BlogsTable title={title} />
        </Suspense>
      </div>
    </div>
  );
};
export default Blogs;
