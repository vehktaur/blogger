import BlogList from '@/components/blogs-list';
import HomeIntro from '@/components/home-intro';
import HomeSearch from '@/components/home-search';
import { Suspense } from 'react';

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : '';

  return (
    <div className='~text-sm/lg ~pt-12/20'>
      <div className='mx-auto max-w-7xl'>
        {/* Swiper intro on homepage*/}
        <HomeIntro />

        {/* Search and filter for blogs list */}
        <HomeSearch />

        {/* List of all the blogs */}
        <Suspense key={category} fallback='Loading...'>
          <BlogList category={category} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
