import { getAllBlogs } from '@/lib/data';
import { MDXRemote } from 'next-mdx-remote/rsc';

const page = async () => {
  const blogs = await getAllBlogs();
  const blog = blogs[0];

  return (
    <div className='prose'>
      <MDXRemote source={blog.content} />
    </div>
  );
};
export default page;
