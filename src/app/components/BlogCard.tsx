import { Blog } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blogs/${blog.title}`}>
      <div className="hover:shadow-offset w-full max-w-[20.625rem] sm:max-w-[18.75rem] border border-black transition-shadow duration-300">
        <div className="border-b border-black">
          <Image
            className="w-full object-cover"
            src={blog.image}
            alt={blog.title}
            width={400}
            height={400}
          />
        </div>

        <div className="p-5 bg-white grid">
          <div className="mb-3">
            <span className="text-white bg-black ~text-xs/sm p-1">
              {blog.category}
            </span>
          </div>

          <h3
            className="font-semibold line-clamp-2 mb-2 text-gray-900 tracking-tight"
            title={blog.title}
          >
            {blog.title}
          </h3>

          <p className="text-sm text-gray-700 tracking-tight line-clamp-3">
            {blog.description}
          </p>

          <div className="mt-4">
            <button className="flex gap-1.5 items-center ~text-sm/base font-bold">
              Read more{' '}
              <Image src="/arrow.png" width={12} height={9} alt="arrow" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;
