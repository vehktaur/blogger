import 'server-only';
import { ConnectDB } from './config/db';
import BlogModel, { PopulatedBlog } from './models/BlogModel';

//Get All Blogs from the Database
export const getAllBlogs = async () => {
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Fetch blogs based on the provided query
    const blogs = await BlogModel.find()
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
