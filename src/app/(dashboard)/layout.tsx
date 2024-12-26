import { Metadata } from 'next';
//Components Import
import Sidebar from '@/components/layout/sidebar';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { auth } from '@/auth';
import { getUser } from '@/lib/server-utils';

export const generateMetadata = async () => {
  const session = await auth();
  const user = await getUser({ id: session?.user?._id });

  return {
    title: `${user?.username} | Logs`,
  };
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = await getUser({ id: session?.user?._id });

  return (
    <div className='flex w-full'>
      <Sidebar user={user} />

      {/* Actual Admin Section */}
      <div className='grid h-full flex-1 content-start'>
        <nav className='sticky top-0 z-10 h-[3.75rem] w-full border-b border-black bg-stone-50 px-5'>
          <div className='mx-auto flex h-full max-w-6xl items-center justify-between'>
            <h3 className='font-medium ~text-base/lg'>Dashboard</h3>
          </div>
        </nav>
        <main className='overflow-x-auto'>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
