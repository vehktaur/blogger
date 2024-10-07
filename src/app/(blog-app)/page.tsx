import BlogList from '@/app/components/BlogList';
import HomeIntro from '../components/HomeIntro';
import HomeSearch from '../components/HomeSearch';
import { getAllBlogs } from '@/lib/data';

const Home = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="~text-sm/lg ~pt-12/20">
      <div className="mx-auto max-w-7xl">
        <section className="text-center ~pt-4/6 sm:px-8">
          <HomeIntro />
        </section>

        <section className="px-5 ~mt-3/6 ~mb-8/16">
          <HomeSearch />
        </section>

        <section className="px-5 ~mb-12/20">
          <BlogList allBlogs={blogs} />
        </section>
      </div>
    </div>
  );
};

export default Home;
