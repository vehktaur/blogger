import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { NextResponse } from 'next/server';

//Get Blogs from the Database
export const GET = async () => {
  //Connect to MongoDB
  try {
    await ConnectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Failed to connect to DB',
      error,
    });
  }

  //const { searchParams } = request.nextUrl;

  try {
    const blogs = await BlogModel.find({ 'author.name': 'Kurapika' });
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
