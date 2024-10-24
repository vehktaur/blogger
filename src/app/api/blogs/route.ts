import { ConnectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { revalidatePath } from 'next/cache';
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

  // Prepare blog data
  const blogData = await request.json();

  // Save blog to the DB
  try {
    await BlogModel.create(blogData);
    revalidatePath('/blogs');
    revalidatePath('/');
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
