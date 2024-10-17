import BlogForm from '@/app/components/BlogForm';
import UseFormContextProvider from '@/app/context/UseFormContextProvider';

const AddBlog = () => {
  return (
    <UseFormContextProvider>
      <BlogForm defaultImage={null} />
    </UseFormContextProvider>
  );
};
export default AddBlog;
