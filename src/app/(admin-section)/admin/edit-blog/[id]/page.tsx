import EditBlogPage from '@/app/components/EditBlogPage';
import { getBlog } from '@/lib/data';

const EditBlog = async ({ params }: { params: { id: string } }) => {
  const blog: any = await getBlog(params.id);

  return <EditBlogPage blog={blog} />;
};
export default EditBlog;
