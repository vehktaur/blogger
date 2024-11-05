import BlogCard from './blog-card';
import { Blog as BlogData } from '@/lib/definitions';
import { getAllBlogs } from '@/lib/data';

const BlogList = async ({ category }: { category: string }) => {
  const blogs = await getAllBlogs();

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const filteredBlogs =
    category === ''
      ? blogs
      : blogs?.filter((blog) =>
          blog.categories.includes(capitalizeString(category)),
        );

  return (
    <section className='padding-inline pt-10 ~pb-12/20'>
      <div className='mx-auto max-w-7xl'>
        {!filteredBlogs ? (
          <p className='text-center font-medium'>Could Not Load Blogs</p>
        ) : filteredBlogs.length === 0 ? (
          <p className='text-center font-medium'>No Blogs In This Category</p>
        ) : (
          <div className='grid items-stretch justify-items-center ~gap-x-5/8 ~gap-y-7/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default BlogList;
