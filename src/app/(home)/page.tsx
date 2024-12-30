import BlogListSkeleton from '@/components/ui/skeletons/blog-list-skeleton';
import BlogList from '@/components/blogs/blogs-list';
import HomeIntro from '@/components/home/home-intro';
import HomeSearch from '@/components/home/home-search';
import { Suspense } from 'react';

const Home = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const category = searchParams?.category?.toString() || '';

  return (
    <div className='pt-20'>
      {/* Swiper intro on homepage*/}
      <HomeIntro />

      {/* Search and filter for blogs list */}
      <HomeSearch />

      {/* List of all the blogs */}
      <Suspense key={category} fallback={<BlogListSkeleton />}>
        <BlogList category={category} />
      </Suspense>
    </div>
  );
};

export default Home;
