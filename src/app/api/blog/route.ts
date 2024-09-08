import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

//Get Blogs from the Database
export const GET = async (request: NextRequest) => {
  //Connect to MongoDB
  await ConnectDB();
  console.log('Get blog data');
  return NextResponse.json({ success: true });
};

//Save Blogs to the Database
export async function POST(request: NextRequest) {
  //Connect to MongoDB
  await ConnectDB();
  const formData = await request.formData();
  const image: File | null = formData.get('image') as unknown as File;

  if (!image) {
    return NextResponse.json({ success: false });
  }

  let imageBytes: ArrayBuffer;
  try {
    imageBytes = await image.arrayBuffer();
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Failed to process image',
    });
  }

  const imageBuffer = Buffer.from(imageBytes);

  const timestamp = Date.now();

  //Save image file to public folder
  const imageUrl = `${timestamp}_${image.name}`;
  const imagePath = `./public/blog-images/${imageUrl}`;

  await writeFile(imagePath, imageBuffer);

  //Create blog and save to DB
  const blogData = {
    title: formData.get('title'),
    description: formData.get('description'),
    categories: formData.getAll('categories[]'),
    author: formData.get('author'),
    authorImg: formData.get('authorImg'),
    image: imageUrl,
    content: formData.get('content'),
  };
  try {
    await BlogModel.create(blogData);
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Blog creation failed',
      blogData,
    });
  }

  return NextResponse.json({
    success: true,
    msg: `Blog added successfully`,
  });
}
