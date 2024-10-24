import { ConnectDB } from '@/lib/config/db';
import { backendClient } from '@/lib/edgestore-server';
import BlogModel from '@/lib/models/BlogModel';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

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

  try {
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

//Delete a Blog from the DB
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await ConnectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Failed to connect to DB',
      error,
    });
  }

  try {
    const id = params.id;
    const { url } = await request.json();
    await backendClient.blogPostImages.deleteFile({ url });
    await BlogModel.deleteOne({ _id: id });
    revalidatePath('/blogs');
    return NextResponse.json({
      success: true,
      msg: 'Blog Deleted',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      msg: 'Could not delete',
      error,
    });
  }
};

//Update a Blog Post
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  //Connect to DB
  try {
    await ConnectDB();
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      msg: 'Failed to connect to DB',
      error,
    });
  }

  try {
    const id = params.id;
    const blog = await BlogModel.findById(id);
    const { url } = blog.image;
    const updatedData = await request.json();
    Object.assign(blog, updatedData);

    if (url && url !== updatedData.image.url)
      await backendClient.blogPostImages.deleteFile({ url });

    await blog.save();
    revalidatePath('/blogs');
    return NextResponse.json({
      success: true,
      msg: 'Blog Updated',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      msg: 'Could not update',
      error,
    });
  }
};
