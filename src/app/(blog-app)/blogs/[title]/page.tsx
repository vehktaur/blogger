'use client';

import { blogData } from '@/lib/placeholder-data';
import Image from 'next/image';

const Blog = ({ params }: { params: { title: string } }) => {
  const blogTitle = decodeURIComponent(params.title);
  const blog = blogData.find((blog) => blog.title === blogTitle);

  return blog ? (
    <>
      <div className="bg-gray-200 pt-20">
        <div className="px-5 pt-16 pb-5 sm:~px-8/20 text-center">
          <div className="max-w-[48rem] mx-auto mb-28">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6">
              {blog.title}
            </h1>

            <Image
              className="mx-auto border border-white rounded-full"
              src={blog.author_img}
              alt={`${blog.author}`}
            />
            <p className="mt-1 pb-2">{blog.author}</p>
          </div>
        </div>
      </div>
      <div className="px-5 sm:~px-8/20 ">
        <div className="max-w-4xl mx-auto">
          <Image
            className="w-full -mt-[6.25rem] mb-10 max-w-[50rem] mx-auto border-4 border-white"
            src={blog.image}
            alt="blog image"
          />

          <h2 className="~text-xl/3xl font-semibold ~mb-4/6">Introduction:</h2>
          <div className="~text-sm/lg">
            {blog.description}
            <p className="my-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              deleniti rerum tempora nesciunt voluptas inventore molestiae sed
              assumenda at eos?
            </p>
            <p className="my-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo odio
              incidunt sed aspernatur perspiciatis officiis aliquam fugit. Nulla
              nemo explicabo ipsam tenetur. Voluptatum nobis similique libero
              temporibus dolorum accusantium ipsam?
            </p>
            <p className="my-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo odio
              incidunt sed aspernatur perspiciatis officiis aliquam fugit. Nulla
              nemo explicabo ipsam tenetur. Voluptatum nobis similique libero
              temporibus dolorum accusantium ipsam?
            </p>
            <p className="my-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo odio
              incidunt sed aspernatur perspiciatis officiis aliquam fugit. Nulla
              nemo explicabo ipsam tenetur. Voluptatum nobis similique libero
              temporibus dolorum accusantium ipsam?
            </p>

            <div className="my-24">
              <p className=" font-semibold">Share this article on:</p>
              <div className="flex items-center gap-1 mt-4">
                <a href="#">
                  <Image
                    src="/x_icon.png"
                    width={50}
                    height={50}
                    alt="X Profile"
                  />
                </a>
                <a href="#">
                  <Image
                    src="/facebook_icon.png"
                    width={50}
                    height={50}
                    alt="Github Profile"
                  />
                </a>
                <a href="#">
                  <Image
                    src="/googleplus_icon.png"
                    width={50}
                    height={50}
                    alt="LinkedIn Profile"
                  />
                </a>
              </div>
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
