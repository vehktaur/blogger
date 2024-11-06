<<<<<<< HEAD
import { ConnectDB } from './config/db';
import { Blog } from './definitions';
import BlogModel from './models/BlogModel';

export const getAllBlogs = async () => {
  'use server';
  try {
    //Connect to MongoDB
    await ConnectDB();

    const blogs = await BlogModel.find({});

    return blogs as Blog[] | undefined | null | any[];
=======
export const getAllBlogs = async () => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs`, {
      next: { revalidate: 60, tags: ['blogs'] },
    });
    if (!res.ok) {
      throw new Error('Failed to get blogs');
    }
    const data = await res.json();

    if (!data.blogs || !Array.isArray(data.blogs)) {
      throw new Error('Unexpected response format');
    }

    return data.blogs;
>>>>>>> error
  } catch (error) {
    console.log(error);
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getBlog = async (id: string) => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs/${id}`, {
<<<<<<< HEAD
      next: { revalidate: 0, tags: [`blog-${id}`] },
=======
      next: { revalidate: 60, tags: [`blog-${id}`] },
>>>>>>> error
    });
    if (!res.ok) {
      throw new Error('Failed to get blogs');
    }
    const data = await res.json();

    if (!data.blog) {
      throw new Error('Unexpected response format');
    }

    return data.blog;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) throw new Error(error.message);
  }
};
