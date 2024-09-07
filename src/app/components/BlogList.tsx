"use client";

import { blogData } from "@/lib/placeholder-data";
import BlogCard from "./BlogCard";
import { useState } from "react";
import { Blog as BlogData, Category } from "@/lib/definitions";
import clsx from "clsx";

const BlogList = () => {
  const [categories, setCategories] = useState<Category[]>([
    { category: "All", active: true },
    { category: "Technology", active: false },
    { category: "Startup", active: false },
    { category: "Lifestyle", active: false },
  ]);

  const [blogs, setBlogs] = useState<BlogData[]>(blogData);

  const filterBlogs = (category: string) => {
    setBlogs(
      category === "All"
        ? blogData
        : blogData.filter((blog) => blog.categories.includes(category)),
    );

    setCategories(
      categories.map((currentCategory) =>
        currentCategory.category === category
          ? { ...currentCategory, active: true }
          : { ...currentCategory, active: false },
      ),
    );
  };
  return (
    <section className="px-5 py-4 sm:px-10">
      <div className="max-w-7xl pt-5">
        <div className="flex items-center justify-center ~gap-1/2">
          {categories.map(({ category, active }) => (
            <button
              key={category}
              onClick={() => filterBlogs(category)}
              className={clsx(
                "rounded-sm py-1 transition-colors duration-300 ~px-2/3 hover:bg-[#444] hover:text-white",
                { "bg-black text-white hover:!bg-black": active },
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-stretch justify-items-center ~gap-x-5/8 ~gap-y-7/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default BlogList;
