'use server';

import { ConnectDB } from '@/lib/config/db';
import { Blog } from '@/lib/definitions';
import { backendClient } from '@/lib/edgestore-server';
import BlogModel from '@/lib/models/BlogModel';
import { revalidatePath } from 'next/cache';

//Save Blogs to the Database
export const addBlog = async (blogData: Blog) => {
  //Connect to MongoDB
  try {
    await ConnectDB();
  } catch (error) {
    return {
      success: false,
      msg: 'Failed to connect to DB',
      error,
    };
  }

  // Save blog to the DB
  try {
    await BlogModel.create(blogData);
    revalidatePath('/blogs');
    revalidatePath('/');
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
    await ConnectDB();
  } catch (error) {
    return {
      success: false,
      msg: 'Failed to connect to DB',
      error,
    };
  }

  try {
    await backendClient.blogPostImages.deleteFile({ url });
    await BlogModel.deleteOne({ _id: id });
    revalidatePath('/');
    revalidatePath('/blogs');
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
  //Connect to DB
  try {
    await ConnectDB();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: 'Failed to connect to DB',
      error,
    };
  }

  try {
    const blog = await BlogModel.findById(id);
    const { url } = blog.image;
    Object.assign(blog, updatedData);

    if (url && url !== updatedData.image.url)
      await backendClient.blogPostImages.deleteFile({ url });

    await blog.save();
    revalidatePath('/');
    revalidatePath('/blogs');
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
