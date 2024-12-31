import BlogForm from '@/components/blogs/blog-form';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import { getBlog } from '@/lib/blog-data';
import { redirect } from 'next/navigation';

const EditBlog = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;


  const blog = await getBlog(id);

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
