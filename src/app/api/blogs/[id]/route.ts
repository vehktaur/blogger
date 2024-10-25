import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { type NextRequest, NextResponse } from 'next/server';

//Get Blogs from the Database
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    //Connect to MongoDB
    await ConnectDB();

    const id = params.id;
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
