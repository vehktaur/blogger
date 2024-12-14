import { PopulatedBlog } from '@/lib/models/blogs';
import { RxDoubleArrowRight } from 'react-icons/rx';
import Link from 'next/link';
import BlurImage from '../ui/blur-image';

const BlogCard = ({ blog }: { blog: PopulatedBlog }) => {
  const url = `${blog.title}__${blog._id}`;
  return (
    <Link
      prefetch={true}
      className='grid'
      href={`/blog/${encodeURIComponent(url)}`}
    >
      <div className='group flex w-full min-w-[18.75rem] max-w-80 flex-col overflow-hidden rounded border border-black shadow transition-shadow duration-500 hover:shadow-offset sm:max-w-[18.75rem]'>
        <div className='border-b border-black'>
          <BlurImage
            className='aspect-[16/11] w-full object-cover sm:aspect-[3/2]'
            src={blog.image.url}
            alt={blog.title}
            width={1280}
            height={720}
          />
        </div>

        <div className='flex flex-col bg-white p-5'>
          <div className='mb-3 flex items-center gap-2'>
            {blog.categories.map((category) => (
              <span
                key={`${category}_${blog._id}`}
                className='rounded-[0.15rem] bg-black px-2 py-1 text-xs text-white'
              >
                {category}
              </span>
            ))}
          </div>

          <h2
            className='mb-2 line-clamp-2 font-semibold tracking-tight text-gray-900'
            title={blog.title}
          >
            {blog.title}
          </h2>

          <p className='line-clamp-3 text-sm tracking-tight text-gray-700'>
            {blog.description}
          </p>
        </div>
        <div className='mb-5 mt-auto px-5'>
          <button className='flex items-center gap-1.5 font-bold ~text-sm/base'>
            Read more
            <RxDoubleArrowRight className='mt-[0.025rem] w-4 transition-transform duration-700 group-hover:translate-x-1 group-hover:scale-x-[1.35]' />
          </button>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;
