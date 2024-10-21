import BlogForm from '@/components/blog-form';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import { getBlog } from '@/lib/data';
import { BlogFormData } from '@/lib/definitions';

const EditBlog = async ({ params }: { params: { id: string } }) => {
  const blog: BlogFormData = await getBlog(params.id);

  const defaultValues = {
    image: {
      preview: blog.image.url,
      url: blog.image.url,
      name: blog.image.name,
    },
    formData: {
      image: {
        url: blog?.image.url,
        thumbnailUrl: blog?.image.thumbnailUrl,
        name: blog?.image.name,
      },
      title: blog?.title,
      categories: blog?.categories,
      content: blog?.content,
      description: blog?.description,
    },
  };

  return (
    <UseFormContextProvider defaultValues={defaultValues}>
      <BlogForm defaultImage={defaultValues.image} edit={true} id={blog._id} />
    </UseFormContextProvider>
  );
};
export default EditBlog;
