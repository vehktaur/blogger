import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

//Connect to MongoDB
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//Get Blogs from the Database
export const GET = async (request: NextRequest) => {
  console.log('Get blog data');
  return NextResponse.json({ success: true });
};

//Save Blogs to the Database
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image: File | null = formData.get('image') as unknown as File;

  if (!image) {
    return NextResponse.json({ success: false });
  }

  const imageBytes = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageBytes);

  const timestamp = Date.now();

  //Save image file to public folder
  const imageUrl = `${timestamp}_${image.name}`;
  const imagePath = `./public/blog-images/${imageUrl}`;

  await writeFile(imagePath, imageBuffer);

  const blogData = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    author: formData.get('author'),
    authorImg: formData.get('authorImg'),
    image: imageUrl,
    content: formData.get('content')
  };

  const blog = await BlogModel.create(blogData);

  return NextResponse.json({
    success: true,
    msg: `Blog added - ${blog.title}`
  });
}
