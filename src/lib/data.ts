import { ConnectDB } from './config/db';
import BlogModel from './models/BlogModel';

export const getAllBlogs = async () => {
  'use server';
  try {
    //Connect to MongoDB
    await ConnectDB();

    const blogs = await BlogModel.find({});

    return blogs;
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (id: string) => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs/${id}`, {
      next: { revalidate: 0, tags: [`blog-${id}`] },
    });
    if (!res.ok) {
      throw new Error('Failed to get blogs');
    }
    const data = await res.json();
    return data.blog;
  } catch (error) {
    console.log(error);
  }
};
