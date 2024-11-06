'use server';

import { ConnectDB } from '@/lib/config/db';
import { backendClient } from '@/lib/edgestore-server';
import BlogModel, { Blog, PopulatedBlog } from '@/lib/models/BlogModel';
import { revalidateTag } from 'next/cache';

//Get All Blogs from the Database
export const getAllBlogs = async (query = {}) => {
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blogs based on the provided query
    const blogs = await BlogModel.find(query)
      .populate('author')
      .lean<PopulatedBlog[]>();

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

export const getBlog = async (id: string) => {
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blogs based on the provided query
    const blog = await BlogModel.findById(id)
      .populate('author')
      .lean<PopulatedBlog>();

    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
  }
};

//Save Blogs to the Database
export const addBlog = async (blogData: Blog) => {
  try {
    //Connect to MongoDB
    await ConnectDB();

    await backendClient.blogPostImages.confirmUpload({
      url: blogData.image.url,
    });

    await BlogModel.create(blogData);
    revalidateTag('blogs');
    return {
      success: true,
      msg: `Blog added successfully`,
      blogData,
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return {
      success: false,
      msg: 'Blog creation failed',
      error: error instanceof Error ? error.message : JSON.stringify(error),
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
    if (error instanceof Error) console.log(error.message);
    return {
      success: false,
      msg: 'Could not delete',
      error,
    };
  }
};

//Update a Blog Post
export const editBlog = async (updatedData: Blog, id: string) => {
  try {
    //Connect to DB
    await ConnectDB();

    const blog = await BlogModel.findById(id); //Get the blog TBU from to the DB

    if (!blog) {
      throw new Error('Blog does not exist');
    }
    const { url } = blog.image; //Get the image present in the DB
    Object.assign(blog, updatedData); //Update the blog with the values from the updatedData

    // Check if the image in the DB and the image in the new (updated) data are different

    if (url && url !== updatedData.image.url) {
      // if they're different, delete the one in edgestore
      await backendClient.blogPostImages.deleteFile({ url });

      // and confirm the new image upload
      await backendClient.blogPostImages.confirmUpload({
        url: updatedData.image.url,
      });
    }

    await blog.save();
    revalidateTag(`blog-${id}`);
    revalidateTag('blogs');

    return {
      success: true,
      msg: 'Blog Updated',
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return {
      success: false,
      msg: 'Could not update',
      error,
    };
  }
};
