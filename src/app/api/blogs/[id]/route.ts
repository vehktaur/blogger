import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { NextRequest, NextResponse } from 'next/server';

//Get Blogs from the Database
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
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

  const id = params.id;

  try {
    const blog = await BlogModel.findById(id);
    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Could not retrieve blog',
      error,
    });
  }
};
