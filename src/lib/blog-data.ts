'use cache';

import 'server-only';
import { ConnectDB } from './config/db';
import Blogs, { PopulatedBlog } from './models/blogs';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import Users from './models/users';

//Get All Blogs from the Database
export const getAllBlogs = async () => {
  cacheTag('blogs');
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blogs based on the provided query
    const blogs = await Blogs.find()
      .populate({ path: 'author', model: Users })
      .lean<PopulatedBlog[]>()
      .then((docs) =>
        docs.map((doc) => {
          if (doc._id) doc._id = doc._id.toString();
          if (doc.image && doc.image._id)
            doc.image._id = doc.image._id.toString();
          if (doc.author && doc.author._id)
            doc.author._id = doc.author._id.toString();

          return doc;
        }),
      );

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

//Get User's Blogs from the Database
export const getUserBlogs = async (id: string) => {
  cacheTag('blogs');
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blogs based on the provided query
    const blogs = await Blogs.find({ author: id })
      .populate({ path: 'author', model: Users })
      .lean<PopulatedBlog[]>()
      .then((docs) =>
        docs.map((doc) => {
          if (doc._id) doc._id = doc._id.toString();
          if (doc.image && doc.image._id)
            doc.image._id = doc.image._id.toString();
          if (doc.author && doc.author._id)
            doc.author._id = doc.author._id.toString();

          return doc;
        }),
      );

    return blogs;
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
  }
};

export const getBlog = async (id: string) => {
  cacheTag(`blog_${id}`);
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blog
    const blog = await Blogs.findById(id)
      .populate({ path: 'author', model: Users })
      .lean<PopulatedBlog>()
      .then((doc) => {
        if (doc) {
          if (doc._id) doc._id = doc._id.toString();
          if (doc.image && doc.image._id)
            doc.image._id = doc.image._id.toString();
          if (doc.author && doc.author._id)
            doc.author._id = doc.author._id.toString();
        }
        
        return doc;
      });

    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
  }
};
