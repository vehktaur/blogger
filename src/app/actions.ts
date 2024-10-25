'use server';

import { ConnectDB } from '@/lib/config/db';
import { Blog } from '@/lib/definitions';
import { backendClient } from '@/lib/edgestore-server';
import BlogModel from '@/lib/models/BlogModel';
import { revalidateTag } from 'next/cache';

//Save Blogs to the Database
export const addBlog = async (blogData: Blog) => {
  try {
    //Connect to MongoDB
    await ConnectDB();

    await BlogModel.create(blogData);
    revalidateTag('blogs');
    return {
      success: true,
      msg: `Blog added successfully`,
      blogData,
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Blog creation failed',
      error,
      blogData,
    };
  }
};

//Delete a Blog from the DB
export const deleteBlog = async (id: string, url: string) => {
  try {
    //Connect to DB
    await ConnectDB();

    await backendClient.blogPostImages.deleteFile({ url });
    await BlogModel.deleteOne({ _id: id });

    revalidateTag('blogs');
    return {
      success: true,
      msg: 'Blog Deleted',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: 'Could not delete',
      error,
    };
  }
};

//Update a Blog Post
export const editBlog = async (updatedData: any, id: string) => {
  try {
    //Connect to DB
    await ConnectDB();

    const blog = await BlogModel.findById(id);
    const { url } = blog.image;
    Object.assign(blog, updatedData);

    if (url && url !== updatedData.image.url)
      await backendClient.blogPostImages.deleteFile({ url });

    await blog.save();
    revalidateTag(`blog-${id}`);
    revalidateTag('blogs');

    return {
      success: true,
      msg: 'Blog Updated',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: 'Could not update',
      error,
    };
  }
};
