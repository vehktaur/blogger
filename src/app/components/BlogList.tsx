import BlogCard from './BlogCard';
import { Blog as BlogData } from '@/lib/definitions';
import { getAllBlogs } from '@/lib/data';

const BlogList = async ({ category }: { category: string }) => {
  const blogs: BlogData[] = await getAllBlogs();

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const filteredBlogs =
    category === ''
      ? blogs
      : blogs.filter((blog) =>
          blog.categories.includes(capitalizeString(category)),
        );

  return (
    <section className="px-5 py-4 sm:px-10">
      <div className="max-w-7xl pt-5">
        {filteredBlogs && filteredBlogs.length > 0 ? (
          <div className="grid items-stretch justify-items-center ~gap-x-5/8 ~gap-y-7/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-center font-medium">No Blogs Found</p>
        )}
      </div>
    </section>
  );
};
export default BlogList;
