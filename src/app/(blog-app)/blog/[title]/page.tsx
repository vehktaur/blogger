import { assets } from '@/assets/assets';
import { getBlog } from '@/lib/data';
import { blogData } from '@/lib/placeholder-data';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

const Blog = async ({ params }: { params: { title: string } }) => {
  const id = decodeURIComponent(params.title);

  const blog = await getBlog(id);

  // const blog = blogData.find((blog) => blog.title === blogTitle);

  return blog ? (
    <>
      <div className="bg-gray-200 pt-20">
        <div className="px-5 pb-5 text-center ~pt-8/16 sm:~px-8/20">
          <div className="mx-auto max-w-[48rem] ~mb-36/40">
            <h1 className="mb-6 text-2xl font-semibold sm:text-3xl md:text-5xl">
              {blog.title}
            </h1>

            <Image
              className="mx-auto rounded-full border border-white ~w-16/20 [image-rendering:high-quality]"
              src={assets.profile_img}
              alt={`${blog.author.name}`}
            />
            <p className="mt-1 pb-2 font-medium italic text-[#333] ~text-sm/base">
              {blog.author.name}
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 sm:~px-8/20">
        <div className="mx-auto max-w-[50rem]">
          <Image
            className="mx-auto -mt-[6.25rem] mb-10 w-full border-4 border-white"
            src={blog.image.url}
            alt={blog.image.name}
            width={600}
            height={100}
          />

          <div className="prose ~mb-4/6 grid w-full">
            <MDXRemote source={blog.content} />
          </div>

          <div className="my-24">
            <p className="font-semibold">Share this article on:</p>
            <div className="mt-4 flex items-center gap-1">
              <a href="#">
                <Image
                  src="/icons/x_icon.png"
                  width={50}
                  height={50}
                  alt="X Profile"
                />
              </a>
              <a href="#">
                <Image
                  src="/icons/facebook_icon.png"
                  width={50}
                  height={50}
                  alt="Github Profile"
                />
              </a>
              <a href="#">
                <Image
                  src="/icons/googleplus_icon.png"
                  width={50}
                  height={50}
                  alt="LinkedIn Profile"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};
export default Blog;
