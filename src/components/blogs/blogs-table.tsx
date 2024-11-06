import { assets } from '@/assets/assets';
import BlogOptions from './blog-options';
import Image from 'next/image';
import { getAllBlogs } from '@/lib/blog-data';

const BlogsTable = async ({ title }: { title: string }) => {
  const blogs = await getAllBlogs();

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(title.toLowerCase()),
  );

  if (!filteredBlogs || filteredBlogs.length === 0) {
    return <p className='mt-4'>No Blogs Found</p>;
  }

  return (
    <section className='mt-4 min-h-[70svh] max-w-fit overflow-x-auto overflow-y-hidden rounded border border-black pb-0.5 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-2'>
      <div className='grid w-max grid-cols-table border-b border-stone-500 bg-stone-200 px-5 py-2 text-base font-medium text-stone-800'>
        <h3>AUTHOR</h3>
        <h3>TITLE</h3>
        <h3>DATE</h3>
        <h3></h3>
      </div>

      <div className='w-max text-sm'>
        {filteredBlogs.map((blog: any) => (
          <div
            key={blog._id}
            className='grid w-full grid-cols-table items-center border-b border-stone-600 px-5 py-3'
          >
            <div className='flex items-center gap-2'>
              <span className='overflow-hidden rounded-full border border-stone-500 ~size-8/10'>
                <Image
                  className='size-full object-cover'
                  src={assets.profile_img}
                  alt='user name'
                />
              </span>
              <span className='font-medium'>
                {blog.author?.name || 'Kurapika'}
              </span>
            </div>
            <div className='flex items-center gap-2 pe-4'>
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
            </div>
            <p>{new Date(blog.createdAt).toDateString()}</p>
            <div>
              <div className='w-fit'>
                <BlogOptions
                  id={blog._id}
                  url={blog.image.url}
                  title={blog.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default BlogsTable;
