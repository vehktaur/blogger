import { blogData } from '@/lib/placeholder-data';
import BlogCard from './BlogCard';
import { Blog as BlogData } from '@/lib/definitions';
import { getAllBlogs } from '@/lib/data';

const BlogList = async () => {
  const blogs: BlogData[] = await getAllBlogs();

  return (
    <section className="px-5 py-4 sm:px-10">
      <div className="max-w-7xl pt-5">
        {blogs ? (
          <div className="mt-8 grid items-stretch justify-items-center ~gap-x-5/8 ~gap-y-7/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <p>No Blogs Found</p>
        )}
      </div>
    </section>
  );
};
export default BlogList;
