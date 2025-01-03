import BlogForm from '@/components/blogs/blog-form';
import UseFormContextProvider from '@/context/UseFormContextProvider';

const AddBlog = () => {
  return (
    <UseFormContextProvider>
      <BlogForm defaultImage={null} />
    </UseFormContextProvider>
  );
};
export default AddBlog;
