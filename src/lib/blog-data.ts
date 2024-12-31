import 'server-only';
import { ConnectDB } from './config/db';
import Blogs, { PopulatedBlog } from './models/blogs';
import { unstable_cache } from 'next/cache';
import Users from './models/users';

//Get All Blogs from the Database
export const getAllBlogs = async () => {
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blogs based on the provided query
    const blogs = await Blogs.find()
      .populate({ path: 'author', model: Users })
      .lean<PopulatedBlog[]>({
        transform: (_: null, ret: PopulatedBlog) => {
          if (ret && ret._id) ret._id = ret._id.toString();
          return ret;
        },
      });
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

//Get User's Blogs from the Database
export const getUserBlogs = async (id: string) => {
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blogs based on the provided query
    const blogs = await Blogs.find({ author: id })
      .populate({ path: 'author', model: Users })
      .lean<PopulatedBlog[]>({
        transform: (_: null, ret: PopulatedBlog) => {
          if (ret && ret._id) ret._id = ret._id.toString();
          return ret;
        },
      });
    return blogs;
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
  }
};

export const getBlog = async (id: string) => {
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blog
    const blog = await Blogs.findById(id)
      .populate({ path: 'author', model: Users })
      .lean<PopulatedBlog>();
    if (blog && blog._id) blog._id = blog._id.toString();
    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
  }
};

export const getCachedBlogs = unstable_cache(
  async () => await getAllBlogs(),
  ['blogs'],
  {
    tags: ['blogs'],
  },
);

export const getCachedUserBlogs = unstable_cache(
  async (id) => await getUserBlogs(id),
  ['blogs'],
  {
    tags: ['blogs'],
  },
);
