import Test from '@/app/components/Test';
import { getBlog } from '@/lib/data';

const EditBlog = async ({ params }: { params: { id: string } }) => {
  const blog: any = await getBlog(params.id);

  return <Test blog={blog} />;
};
export default EditBlog;
