import BlogsTable from '@/app/components/BlogsTable';
import SortSearch from '@/app/components/SortSearch';
import { Metadata } from 'next';

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
    <div className="h-full px-5 pb-4 ~pt-5/8">
      <div className="mx-auto min-h-full max-w-6xl">
        <header>
          <SortSearch />
          <h1 className="font-medium ~text-lg/xl ~mt-4/6">All Blogs</h1>
        </header>

        <div className="mt-4">
          <BlogsTable title={title} />
        </div>
      </div>
    </div>
  );
};
export default Blogs;
