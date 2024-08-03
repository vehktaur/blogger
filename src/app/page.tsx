import BlogList from '@/app/components/BlogList';
import Navbar from '@/app/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-5 ~text-sm/lg">
        <div className="max-w-7xl mx-auto">
          <section className="text-center ~pt-8/14 sm:px-8">
            <h1 className="font-semibold text-3xl sm:text-5xl ~mb-4/8">
              Latest Blogs
            </h1>
            <p className="max-w-5xl mx-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
              perspiciatis accusantium laboriosam blanditiis quas reprehenderit
              soluta? Accusamus maxime facere, nemo provident tempora velit
              veritatis molestiae.
            </p>
          </section>

          <section className="~mb-8/16">
            <form className="flex items-stretch shadow-offset min-w-[260px] w-4/5 max-w-[35rem] mx-auto ~mt-8/12">
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

          <section className="~mb-12/20">
            <BlogList />
          </section>
        </div>
      </main>
    </>
  );
}
