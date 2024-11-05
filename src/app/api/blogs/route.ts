import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { NextResponse } from 'next/server';

//Get Blogs from the Database
export const GET = async () => {
  try {
    //Connect to MongoDB
    await ConnectDB();

    const blogs = await BlogModel.find();
    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Could not retrieve blog posts',
      error,
    });
  }
};
