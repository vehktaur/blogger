import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { type NextRequest, NextResponse } from 'next/server';

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

//Save Blogs to the Database
export async function POST(request: NextRequest) {
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

  //Retrieve the formData from the request
  const formData = await request.formData();
  const authorData = formData.get('author') as string;
  const imageData = formData.get('image') as string;

  /*
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

  try {
    await writeFile(imagePath, imageBuffer);
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Failed to write file',
      error,
    });
  }

   */

  // Parse formData (author and image)
  let author, image;

  try {
    author = JSON.parse(authorData);
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Failed to parse author data',
      error,
    });
  }

  try {
    image = JSON.parse(imageData);
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Failed to parse blog image',
      error,
    });
  }

  // Prepare blog data
  const blogData = {
    title: formData.get('title'),
    description: formData.get('description'),
    categories: formData.getAll('categories[]'),
    author: author,
    image: image,
    content: formData.get('content'),
  };

  // Save blog to the DB
  try {
    await BlogModel.create(blogData);
    return NextResponse.json({
      success: true,
      msg: `Blog added successfully`,
      blogData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: 'Blog creation failed',
      error,
      blogData,
    });
  }
}
