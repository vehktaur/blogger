'use client';

import { blogData } from '@/assets/assets';
import Navbar from '@/app/components/Navbar';

const Blog = ({ params }: { params: { title: string } }) => {
  const blogTitle = decodeURIComponent(params.title);
  const blog = blogData.find((blog) => blog.title === blogTitle);

  return (
    <div className="text-center">
      <Navbar />
      {blog?.title}
    </div>
  );
};
export default Blog;
