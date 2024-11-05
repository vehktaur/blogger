import BlurImage from '@/components/ui/blur-image';
import { assets } from '@/assets/assets';
import { getAllBlogs, getBlog } from '@/lib/data';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Blog as BlogProps } from '@/lib/models/BlogModel';

// Revalidate blog posts after 1 minute
export const revalidate = 60;

// Generate Static Blog Pages at build time
export const generateStaticParams = async () => {
  const blogs: BlogProps[] = await getAllBlogs();
  const staticBlogs = blogs.map((blog) => {
    title: `${blog.title}__${blog._id}`;
  });

  return staticBlogs;
};

export const generateMetadata = async ({
  params,
}: {
  params: { title: string };
}) => {
  const url = decodeURIComponent(params.title);
  const id = url.split('__').pop();

  const blog: BlogProps = await getBlog(id || 'no-id');
  return {
    title: `${blog.title} | Blogger`,
    description: blog.description,
  };
};

const Blog = async ({ params }: { params: { title: string } }) => {
  const url = decodeURIComponent(params.title);
  const id = url.split('__').pop();

  const blog = await getBlog(id || 'no-id');

  if (!blog) {
    redirect('/');
  }

  return (
    <>
      <div className='bg-gray-200 pt-20'>
        <div className='px-5 pb-5 text-center ~pt-8/16 sm:~px-8/20'>
          <div className='mx-auto max-w-[48rem] ~mb-36/40'>
            <h1 className='mb-6 text-2xl font-bold sm:text-3xl md:text-5xl'>
              {blog.title}
            </h1>

            <BlurImage
              className='mx-auto rounded-full border border-white ~w-16/20'
              src={assets.profile_img}
              alt={`${blog.author?.name || 'Kurapika'}`}
              width={960}
              height={480}
            />
            <p className='mt-1 pb-2 font-medium italic text-[#333] ~text-sm/base'>
              {blog.author?.name || 'Kurapika'}
            </p>
          </div>
        </div>
      </div>
      <div className='px-5 sm:~px-8/20'>
        <div className='mx-auto max-w-[50rem]'>
          <BlurImage
            className='mx-auto -mt-[6.25rem] mb-10 w-full border-4 border-white'
            src={blog.image.url}
            alt={blog.image.name}
            width={1280}
            height={720}
          />

          <div className='prose ~mb-4/6 prose-h1:~text-2xl/3xl prose-h1:sm:text-4xl'>
            <MDXRemote source={blog.content} />
          </div>

          <div className='my-24'>
            <p className='font-semibold'>Share this article on:</p>
            <div className='mt-4 flex items-center gap-1'>
              <a href='#'>
                <Image
                  src='/icons/x_icon.png'
                  width={50}
                  height={50}
                  alt='X Profile'
                />
              </a>
              <a href='#'>
                <Image
                  src='/icons/facebook_icon.png'
                  width={50}
                  height={50}
                  alt='Github Profile'
                />
              </a>
              <a href='#'>
                <Image
                  src='/icons/googleplus_icon.png'
                  width={50}
                  height={50}
                  alt='LinkedIn Profile'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
