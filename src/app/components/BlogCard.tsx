import { Blog } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blogs/${encodeURIComponent(blog.title)}`}>
      <div className="hover:shadow-offset w-full max-w-[20.625rem] sm:max-w-[18.75rem] border border-black transition-shadow duration-500 shadow group rounded overflow-hidden">
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
          <div className="mb-3 flex items-center gap-2">
            {blog.category.map((category) => (
              <span
                key={`${category}_${blog.id}`}
                className="text-white bg-black ~text-xs/sm p-1 rounded-[0.1rem]"
              >
                {category}
              </span>
            ))}
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
            <button className="flex gap-2 items-baseline ~text-sm/base font-bold">
              Read more
              <Image
                className="group-hover:translate-x-1 group-hover:scale-x-[1.35] duration-700 transition-transform"
                src="/arrow.png"
                width={12}
                height={9}
                alt="arrow"
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;
