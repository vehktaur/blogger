import BlogForm from '@/components/blog-form';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import { getBlog } from '@/lib/data';
import { BlogFormData } from '@/lib/definitions';
import { redirect } from 'next/navigation';

const EditBlog = async ({ params }: { params: { id: string } }) => {
  const blog: BlogFormData = await getBlog(params.id);

  // Go back to blogs page if blog doesn't exist
  if (!blog) {
    redirect('/blogs');
  }

  const defaultValues = {
    image: {
      preview: blog.image.url,
      url: blog.image.url,
      name: blog.image.name,
    },
    formData: {
      image: {
        url: blog.image.url,
        thumbnailUrl: blog.image.thumbnailUrl,
        name: blog.image.name,
      },
      title: blog.title,
      categories: blog.categories,
      content: blog.content,
      description: blog.description,
    },
  };

  return (
    <UseFormContextProvider defaultValues={defaultValues.formData}>
      <BlogForm defaultImage={defaultValues.image} edit={true} id={blog._id} />
    </UseFormContextProvider>
  );
};
export default EditBlog;
