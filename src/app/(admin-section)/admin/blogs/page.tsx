import Dropdown from '@/app/components/Dropdown';
import { assets } from '@/assets/assets';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';

const Blogs = async () => {
  const getAllBlogs = async () => {
    try {
      const apiUrl = process.env.API_URL || 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/api/blogs`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to get blogs');
      }
      const data = await res.json();
      return data.blogs;
    } catch (error) {
      console.log(error);
    }
  };

  const blogs = await getAllBlogs();

  return (
    <div className="h-full px-5 pb-4 ~pt-5/8">
      <div className="mx-auto min-h-full max-w-6xl">
        <header>
          <div className="flex items-center justify-between gap-2 sm:justify-start sm:gap-4">
            <div className="relative">
              <span className="absolute left-0 h-full content-center">
                <MagnifyingGlassIcon className="text-[#B0B0B0] ~w-5/6" />
              </span>

              <input
                className="h-full border-b border-grey-500 py-2 text-sm outline-none ~ps-6/8 ~pe-1/2"
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
              />
            </div>

            <div className="flex-shrink-0">
              <button className="rounded-lg border border-grey-500 bg-white py-[0.35rem] text-sm ~px-2/3">
                Sort by:
              </button>
            </div>
          </div>

          <h1 className="font-medium ~text-lg/xl ~mt-4/6">All Blogs</h1>
        </header>

        <div className="mt-4">
          {blogs ? (
            <section className="min-h-[70svh] max-w-fit overflow-x-auto rounded border border-black pb-0.5 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-2">
              <div className="grid w-max grid-cols-table border-b border-stone-500 bg-stone-200 px-5 py-2 text-base font-medium text-stone-800">
                <h3>AUTHOR</h3>
                <h3>TITLE</h3>
                <h3>DATE</h3>
                <h3></h3>
              </div>

              <div className="w-max text-sm">
                {blogs?.map((blog: any) => (
                  <div
                    key={blog._id}
                    className="grid w-full grid-cols-table items-center border-b border-stone-600 px-5 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="overflow-hidden rounded-full ~size-8/10">
                        <Image
                          className="size-full object-cover"
                          src={assets.profile_img}
                          alt="user name"
                        />
                      </span>
                      <span className="font-medium">{blog.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2 pe-4">
                      <span className="flex-shrink-0 cursor-pointer overflow-hidden rounded-full transition-all duration-500 ~size-8/10 hover:z-10 hover:scale-[3]">
                        <Image
                          className="size-full object-cover object-center"
                          src={blog.image.url}
                          width={500}
                          height={500}
                          alt="user name"
                        />
                      </span>
                      <p className="truncate" title={blog.title}>
                        {blog.title}
                      </p>
                    </div>
                    <p>{new Date(blog.createdAt).toDateString()}</p>
                    <div>
                      <div className="w-fit">
                        <Dropdown id={blog._id} url={blog.image.url} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <p>No Blogs Found</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Blogs;
