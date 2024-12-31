'use server';

import { auth } from '@/auth';
import { ConnectDB } from '@/lib/config/db';
import { backendClient } from '@/lib/edgestore-server';
import Blogs, { Blog } from '@/lib/models/blogs';
import { Types } from 'mongoose';
import { revalidateTag } from 'next/cache';

//Save Blogs to the Database
export const addBlog = async (blogData: Blog) => {
  const session = await auth();

  if (!session || !session.user)
    return {
      success: false,
      msg: 'User must be logged in',
    };

  try {
    //Connect to MongoDB
    await ConnectDB();

    await backendClient.blogPostImages.confirmUpload({
      url: blogData.image.url,
    });

    blogData.author = new Types.ObjectId(
      session.user._id || '672603b69bb965d1dd286215',
    );

    await Blogs.create(blogData);
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
    await Blogs.deleteOne({ _id: id });

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

    const blog = await Blogs.findById(id); //Get the blog TBU from to the DB

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
    revalidateTag(`blog_${id}`);
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
