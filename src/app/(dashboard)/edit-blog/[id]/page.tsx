import BlogForm from '@/components/blogs/blog-form';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import { getBlog } from '@/lib/blog-data';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

const EditBlog = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const getCachedBlog = unstable_cache(
    async (id: string) => await getBlog(id),
    [`blog-${id}`],
    {
      tags: [`blog-${id}`],
    },
  );

  const blog = await getCachedBlog(id);

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
