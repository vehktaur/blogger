import { assets } from '@/assets/assets';
import BlogOptions from './blog-options';
import Image from 'next/image';
import { getCachedBlogs, getCachedUserBlogs } from '@/lib/blog-data';
import { auth } from '@/auth';
import { PopulatedBlog } from '@/lib/models/blogs';

const BlogsTable = async ({ title }: { title: string }) => {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  let blogs: PopulatedBlog[] | undefined;

  if (isAdmin) {
    blogs = await getCachedBlogs();
  } else if (session?.user?._id) {
    blogs = await getCachedUserBlogs(session.user._id);
  } else {
    console.error('User is not authenticated or ID is missing.');
    blogs = [];
  }

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(title.toLowerCase()),
  );

  if (!filteredBlogs || filteredBlogs.length === 0) {
    return <p className='mt-4'>No Blogs Found</p>;
  }

  return (
    <section className='mt-4 min-h-[70svh] max-w-fit overflow-x-auto overflow-y-hidden border border-black pb-0.5 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-2'>
      <table>
        <thead>
          <tr className='block w-full border-b border-stone-500 bg-stone-200 px-5 py-2 text-left text-base font-medium text-stone-800'>
            {isAdmin && <th className='w-48'>AUTHOR</th>}
            <th className='w-96 ps-6'>TITLE</th>
            <th className='w-64'>DATE</th>
            <th className='w-12'></th>
          </tr>
        </thead>
        <tbody className='text-sm'>
          {filteredBlogs.map((blog) => (
            <tr
              key={blog._id}
              className='flex items-center border-b border-stone-600 px-5 py-3'
            >
              {isAdmin && (
                <td className='flex w-48 items-center gap-2'>
                  <span className='overflow-hidden rounded-full border border-stone-500 ~size-8/10'>
                    <Image
                      className='size-full object-cover'
                      src={blog.author.image || assets.profile_img}
                      width={960}
                      height={480}
                      alt={blog.author.username}
                    />
                  </span>
                  <span className='font-medium'>
                    {blog.author?.username || 'Kurapika'}
                  </span>
                </td>
              )}
              <td className='flex w-96 items-center gap-2 ps-6 px-8'>
                <span className='flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-stone-500 transition-all duration-500 ~size-8/10 hover:z-10 hover:scale-[3]'>
                  <Image
                    className='size-full object-cover object-center'
                    src={blog.image.url}
                    width={840}
                    height={480}
                    alt='user name'
                  />
                </span>
                <p className='truncate' title={blog.title}>
                  {blog.title}
                </p>
              </td>
              <td className='w-64'>
                {new Date(blog.createdAt).toDateString()}
              </td>
              <td className='w-16 pe-4'>
                <div className='ms-auto w-fit'>
                  <BlogOptions
                    id={String(blog._id)}
                    url={blog.image.url}
                    title={blog.title}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default BlogsTable;
