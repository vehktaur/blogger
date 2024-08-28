import BlogList from '@/app/components/BlogList';
import Navbar from '@/app/components/Navbar';
import HomeIntro from './components/HomeIntro';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="~text-sm/lg">
        <div className="max-w-7xl mx-auto">
          <section className="text-center sm:px-8 ~pt-4/10">
            <HomeIntro />
          </section>

          <section className="px-5  ~mb-8/16 ~mt-6/10">
            <form className="flex items-stretch shadow-offset min-w-[260px] w-4/5 max-w-[35rem] mx-auto">
              <input
                className="~px-3/4 ~py-2.5/3 border border-black w-full outline-none"
                type="email"
                name="users_email"
                id="users_email"
                placeholder="Enter your email"
              />
              <button
                className="border border-black border-l-0 ~px-3/6 hover:bg-gray-200 transition-colors duration-300"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </section>

          <section className="~mb-12/20 px-5 ">
            <BlogList />
          </section>
        </div>
      </main>
    </>
  );
}
