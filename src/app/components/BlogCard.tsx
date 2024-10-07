import { Blog } from '@/lib/definitions';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link className="grid" href={`/blog/${blog._id}`}>
      <div className="group w-full max-w-[20.625rem] overflow-hidden rounded border border-black shadow transition-shadow duration-500 hover:shadow-offset sm:max-w-[18.75rem]">
        <div className="border-b border-black">
          <Image
            className="w-full object-cover"
            src={blog.image.url}
            alt={blog.title}
            width={960}
            height={480}
          />
        </div>

        <div className="flex h-full flex-col bg-white p-5">
          <div className="mb-3 flex items-center gap-2">
            {blog.categories.map((category) => (
              <span
                key={`${category}_${blog._id}`}
                className="rounded-[0.1rem] bg-black p-1 text-white ~text-xs/sm"
              >
                {category}
              </span>
            ))}
          </div>

          <h3
            className="mb-2 line-clamp-2 font-semibold tracking-tight text-gray-900"
            title={blog.title}
          >
            {blog.title}
          </h3>

          <p className="line-clamp-3 text-sm tracking-tight text-gray-700">
            {blog.description}
          </p>

          <div className="mt-4">
            <button className="flex items-center gap-1.5 font-bold ~text-sm/base">
              Read more
              <ChevronDoubleRightIcon className="mt-[0.025rem] w-4 transition-transform duration-700 group-hover:translate-x-1 group-hover:scale-x-[1.35]" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;
