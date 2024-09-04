"use client";

import { blogData } from "@/lib/placeholder-data";
import Image from "next/image";

const Blog = ({ params }: { params: { title: string } }) => {
  const blogTitle = decodeURIComponent(params.title);
  const blog = blogData.find((blog) => blog.title === blogTitle);

  return blog ? (
    <>
      <div className="bg-gray-200 pt-20">
        <div className="px-5 pb-5 pt-16 text-center sm:~px-8/20">
          <div className="mx-auto mb-28 max-w-[48rem]">
            <h1 className="mb-6 text-2xl font-semibold sm:text-3xl md:text-5xl">
              {blog.title}
            </h1>

            <Image
              className="mx-auto w-20 rounded-full border border-white [image-rendering:high-quality]"
              src={blog.author_img}
              alt={`${blog.author}`}
            />
            <p className="mt-1 pb-2 font-medium italic text-[#333]">
              {blog.author}
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 sm:~px-8/20">
        <div className="mx-auto max-w-4xl">
          <Image
            className="mx-auto -mt-[6.25rem] mb-10 w-full max-w-[50rem] border-4 border-white"
            src={blog.image}
            alt="blog image"
          />

          <h2 className="font-semibold ~text-xl/3xl ~mb-4/6">Introduction:</h2>
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
      </div>
    </>
  ) : (
    <></>
  );
};
export default Blog;
